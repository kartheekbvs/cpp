import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LearningState {
  // Currently selected topic
  currentTopicId: string;
  setCurrentTopic: (id: string) => void;

  // Completed topics
  completedTopics: string[];
  markCompleted: (id: string) => void;
  isCompleted: (id: string) => boolean;

  // Checkpoint answers
  checkpointAnswers: Record<string, number>;
  setCheckpointAnswer: (topicId: string, answer: number) => void;
  hasAnsweredCheckpoint: (topicId: string) => boolean;
  isCheckpointCorrect: (topicId: string, correctAnswer: number) => boolean;

  // Current lesson section (which rule/tab is active)
  activeSection: string;
  setActiveSection: (section: string) => void;

  // Sidebar open/close (mobile)
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Command input
  commandInput: string;
  setCommandInput: (input: string) => void;

  // Progress percentage
  getProgress: () => number;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      currentTopicId: '1.1',
      setCurrentTopic: (id) => set({ currentTopicId: id, activeSection: 'story' }),

      completedTopics: [],
      markCompleted: (id) =>
        set((state) => ({
          completedTopics: state.completedTopics.includes(id)
            ? state.completedTopics
            : [...state.completedTopics, id],
        })),
      isCompleted: (id) => get().completedTopics.includes(id),

      checkpointAnswers: {},
      setCheckpointAnswer: (topicId, answer) =>
        set((state) => ({
          checkpointAnswers: { ...state.checkpointAnswers, [topicId]: answer },
        })),
      hasAnsweredCheckpoint: (topicId) => topicId in get().checkpointAnswers,
      isCheckpointCorrect: (topicId, correctAnswer) =>
        get().checkpointAnswers[topicId] === correctAnswer,

      activeSection: 'story',
      setActiveSection: (section) => set({ activeSection: section }),

      sidebarOpen: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      commandInput: '',
      setCommandInput: (input) => set({ commandInput: input }),

      getProgress: () => {
        const totalTopics = 91; // Total topics across all phases
        const completed = get().completedTopics.length;
        return Math.round((completed / totalTopics) * 100);
      },
    }),
    {
      name: 'cpp-learning-store',
      partialize: (state) => ({
        currentTopicId: state.currentTopicId,
        completedTopics: state.completedTopics,
        checkpointAnswers: state.checkpointAnswers,
      }),
    }
  )
);
