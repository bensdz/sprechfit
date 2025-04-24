/*
  # Initial Schema for SprechFit German Learning App

  1. New Tables
    - `users`
      - Core user information and preferences
    - `topics`
      - Speaking practice topics with difficulty levels
    - `practice_sessions`
      - User practice attempts and recordings
    - `user_progress`
      - Track user achievements and statistics
    - `common_mistakes`
      - Store typical German pronunciation/grammar mistakes

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  display_name text,
  current_level text CHECK (current_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  is_premium boolean DEFAULT false,
  streak_count int DEFAULT 0,
  last_practice_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create topics table
CREATE TABLE IF NOT EXISTS topics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text_de text NOT NULL, -- German text
  text_en text NOT NULL, -- English translation
  level text NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  category text NOT NULL,
  is_premium boolean DEFAULT false,
  grammar_focus text[], -- Array of grammar points covered
  key_vocabulary text[], -- Important vocabulary for the topic
  created_at timestamptz DEFAULT now()
);

-- Create practice_sessions table
CREATE TABLE IF NOT EXISTS practice_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  topic_id uuid REFERENCES topics(id),
  duration_seconds int NOT NULL,
  recording_url text,
  score int CHECK (score >= 0 AND score <= 100),
  pronunciation_score int CHECK (pronunciation_score >= 0 AND pronunciation_score <= 100),
  grammar_score int CHECK (grammar_score >= 0 AND grammar_score <= 100),
  fluency_score int CHECK (fluency_score >= 0 AND fluency_score <= 100),
  feedback text,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  total_practice_minutes int DEFAULT 0,
  total_sessions int DEFAULT 0,
  best_streak int DEFAULT 0,
  words_used int DEFAULT 0,
  average_score numeric(5,2) DEFAULT 0,
  level_progress jsonb DEFAULT '{}',
  achievements jsonb DEFAULT '[]',
  updated_at timestamptz DEFAULT now()
);

-- Create common_mistakes table
CREATE TABLE IF NOT EXISTS common_mistakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  mistake_type text NOT NULL CHECK (mistake_type IN ('pronunciation', 'grammar', 'vocabulary')),
  incorrect_form text NOT NULL,
  correct_form text NOT NULL,
  occurrence_count int DEFAULT 1,
  last_seen_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE common_mistakes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = auth_id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = auth_id);

CREATE POLICY "Anyone can read topics"
  ON topics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read their practice sessions"
  ON practice_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create practice sessions"
  ON practice_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read their mistakes"
  ON common_mistakes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX topics_level_idx ON topics(level);
CREATE INDEX topics_category_idx ON topics(category);
CREATE INDEX practice_sessions_user_id_idx ON practice_sessions(user_id);
CREATE INDEX practice_sessions_created_at_idx ON practice_sessions(created_at);
CREATE INDEX common_mistakes_user_id_idx ON common_mistakes(user_id);