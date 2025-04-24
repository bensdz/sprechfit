import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Alert, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import Fonts from '@/constants/Fonts';
import { Mic, MicOff, X, Play, Pause } from 'lucide-react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

type RecordingModalProps = {
  visible: boolean;
  onClose: () => void;
  topic: string;
  durationSeconds: number;
};

export default function RecordingModal({ visible, onClose, topic, durationSeconds }: RecordingModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);
  const [recordingPermission, setRecordingPermission] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  
  const recording = useRef<Audio.Recording | null>(null);
  const sound = useRef<Audio.Sound | null>(null);
  const timer = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (visible) {
      // Reset state when modal opens
      setIsRecording(false);
      setRecordingUri(null);
      setRemainingSeconds(durationSeconds);
      setFeedback(null);
      setScore(null);
      
      // Check permissions
      checkPermission();
    }
    
    return () => {
      // Cleanup on unmount
      stopRecording();
      stopPlayback();
      
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [visible, durationSeconds]);
  
  const checkPermission = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setRecordingPermission(status === 'granted');
      
      if (status !== 'granted') {
        if (Platform.OS !== 'web') {
          Alert.alert(
            'Permission Required',
            'Please grant microphone access to record your speech',
            [{ text: 'OK' }]
          );
        } else {
          console.log('Microphone permission not granted');
        }
      }
    } catch (error) {
      console.log('Error requesting permissions:', error);
    }
  };
  
  const startRecording = async () => {
    try {
      // Configure audio
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      
      // Start recording
      const { recording: rec } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      recording.current = rec;
      setIsRecording(true);
      
      // Start timer
      startTimer();
    } catch (error) {
      console.log('Error starting recording:', error);
      if (Platform.OS !== 'web') {
        Alert.alert('Error', 'Failed to start recording. Please try again.');
      }
    }
  };
  
  const stopRecording = async () => {
    if (!recording.current) return;
    
    try {
      setIsRecording(false);
      
      // Stop timer
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      
      await recording.current.stopAndUnloadAsync();
      const uri = recording.current.getURI();
      
      // Reset audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      
      if (uri) {
        setRecordingUri(uri);
        generateFeedback();
      }
      
      recording.current = null;
    } catch (error) {
      console.log('Error stopping recording:', error);
    }
  };
  
  const startTimer = () => {
    setRemainingSeconds(durationSeconds);
    
    timer.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          stopRecording();
          if (timer.current) {
            clearInterval(timer.current);
            timer.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const playRecording = async () => {
    if (!recordingUri) return;
    
    try {
      // Stop any existing playback
      await stopPlayback();
      
      // Load and play the recording
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: recordingUri },
        { shouldPlay: true }
      );
      
      sound.current = newSound;
      setIsPlaying(true);
      
      // When playback finishes
      sound.current.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.log('Error playing recording:', error);
    }
  };
  
  const stopPlayback = async () => {
    if (!sound.current) return;
    
    try {
      await sound.current.stopAsync();
      await sound.current.unloadAsync();
      sound.current = null;
      setIsPlaying(false);
    } catch (error) {
      console.log('Error stopping playback:', error);
    }
  };
  
  const generateFeedback = () => {
    // In a real app, this would analyze the speech recording
    // For demo purposes, we'll simulate feedback
    
    // Simulated score between 65-95
    const randomScore = Math.floor(Math.random() * 31) + 65;
    setScore(randomScore);
    
    // Sample feedback points
    const feedbackPoints = [
      'Good use of vocabulary related to the topic.',
      'Try to use more complex sentence structures.',
      'Watch out for pronunciation of "-ed" endings.',
      'Good pace and fluency in your speech.',
      'Consider using more connecting words for smoother transitions.'
    ];
    
    // Choose 3 random feedback points
    const selectedFeedback = [];
    const indices = new Set();
    
    while (indices.size < 3) {
      indices.add(Math.floor(Math.random() * feedbackPoints.length));
    }
    
    indices.forEach(index => {
      selectedFeedback.push(feedbackPoints[index]);
    });
    
    setFeedback(selectedFeedback.join('\n\n'));
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Speaking Practice</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={Colors.grey[600]} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.topicContainer}>
            <Text style={styles.topicLabel}>Your Topic</Text>
            <Text style={styles.topicText}>{topic}</Text>
          </View>
          
          {recordingUri ? (
            <View style={styles.feedbackContainer}>
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreLabel}>Your Score</Text>
                <Text style={styles.scoreValue}>{score}%</Text>
                <View style={styles.scoreBar}>
                  <View 
                    style={[
                      styles.scoreBarFill, 
                      { width: `${score}%` },
                      score && score < 70 ? styles.scoreBarLow : 
                      score && score < 85 ? styles.scoreBarMedium : 
                      styles.scoreBarHigh
                    ]} 
                  />
                </View>
              </View>
              
              <Text style={styles.feedbackTitle}>Feedback</Text>
              <Text style={styles.feedbackText}>{feedback}</Text>
              
              <View style={styles.playbackControls}>
                <TouchableOpacity
                  style={styles.playButton}
                  onPress={isPlaying ? stopPlayback : playRecording}
                >
                  {isPlaying ? (
                    <Pause size={24} color={Colors.primary.main} />
                  ) : (
                    <Play size={24} color={Colors.primary.main} />
                  )}
                  <Text style={styles.playButtonText}>
                    {isPlaying ? 'Stop Playback' : 'Play Recording'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.timerContainer}>
                <Text style={styles.timerText}>{formatTime(remainingSeconds)}</Text>
                <View style={styles.timerBar}>
                  <View 
                    style={[
                      styles.timerBarFill, 
                      { width: `${(remainingSeconds / durationSeconds) * 100}%` }
                    ]} 
                  />
                </View>
              </View>
              
              {recordingPermission ? (
                <TouchableOpacity
                  style={[
                    styles.recordButton,
                    isRecording && styles.recordingButton
                  ]}
                  onPress={isRecording ? stopRecording : startRecording}
                >
                  {isRecording ? (
                    <MicOff size={32} color={Colors.common.white} />
                  ) : (
                    <Mic size={32} color={Colors.common.white} />
                  )}
                  <Text style={styles.recordButtonText}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.permissionContainer}>
                  <Text style={styles.permissionText}>
                    Microphone permission is required to record audio.
                  </Text>
                  <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={checkPermission}
                  >
                    <Text style={styles.permissionButtonText}>
                      Grant Permission
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              
              <Text style={styles.instructionText}>
                {isRecording 
                  ? 'Speak clearly and at a natural pace.'
                  : 'Press the button to start recording. Try to speak for the entire duration.'}
              </Text>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.background.default,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 16,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    ...Fonts.heading,
    fontSize: Fonts.sizes.xxl,
    color: Colors.text.primary,
  },
  closeButton: {
    padding: 4,
  },
  topicContainer: {
    backgroundColor: Colors.background.paper,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  topicLabel: {
    ...Fonts.subheading,
    fontSize: Fonts.sizes.medium,
    color: Colors.primary.main,
    marginBottom: 8,
  },
  topicText: {
    ...Fonts.body,
    fontSize: Fonts.sizes.large,
    color: Colors.text.primary,
    lineHeight: 28,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  timerText: {
    ...Fonts.heading,
    fontSize: Fonts.sizes.display,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  timerBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.grey[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  timerBarFill: {
    height: '100%',
    backgroundColor: Colors.primary.main,
    borderRadius: 4,
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary.main,
    borderRadius: 30,
    paddingVertical: 16,
    marginBottom: 24,
  },
  recordingButton: {
    backgroundColor: Colors.error.main,
  },
  recordButtonText: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.large,
    color: Colors.common.white,
    marginLeft: 10,
  },
  instructionText: {
    ...Fonts.body,
    fontSize: Fonts.sizes.small,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  permissionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  permissionText: {
    ...Fonts.body,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 16,
  },
  permissionButton: {
    backgroundColor: Colors.secondary.main,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  permissionButtonText: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.medium,
    color: Colors.common.white,
  },
  feedbackContainer: {
    flex: 1,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreLabel: {
    ...Fonts.body,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.secondary,
    marginBottom: 8,
  },
  scoreValue: {
    ...Fonts.heading,
    fontSize: Fonts.sizes.xxxl,
    color: Colors.primary.main,
    marginBottom: 16,
  },
  scoreBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.grey[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  scoreBarLow: {
    backgroundColor: Colors.error.main,
  },
  scoreBarMedium: {
    backgroundColor: Colors.warning.main,
  },
  scoreBarHigh: {
    backgroundColor: Colors.success.main,
  },
  feedbackTitle: {
    ...Fonts.subheading,
    fontSize: Fonts.sizes.large,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  feedbackText: {
    ...Fonts.body,
    fontSize: Fonts.sizes.medium,
    color: Colors.text.primary,
    lineHeight: 24,
    marginBottom: 24,
  },
  playbackControls: {
    marginBottom: 16,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.paper,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.primary.main,
    paddingVertical: 12,
  },
  playButtonText: {
    ...Fonts.bodyBold,
    fontSize: Fonts.sizes.medium,
    color: Colors.primary.main,
    marginLeft: 8,
  },
});