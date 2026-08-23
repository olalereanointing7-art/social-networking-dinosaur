import create from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem('token', token);
    set({ token });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  }
}));

export const usePostStore = create((set) => ({
  posts: [],
  loading: false,
  
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  setLoading: (loading) => set({ loading })
}));

export const useStreamStore = create((set) => ({
  streams: [],
  liveStreams: [],
  currentStream: null,
  
  setStreams: (streams) => set({ streams }),
  setLiveStreams: (liveStreams) => set({ liveStreams }),
  setCurrentStream: (currentStream) => set({ currentStream })
}));

export const useGameStore = create((set) => ({
  games: [],
  userGames: [],
  
  setGames: (games) => set({ games }),
  setUserGames: (userGames) => set({ userGames })
}));
