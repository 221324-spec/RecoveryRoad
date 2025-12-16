// Mock API wrapper for frontend-only demo to avoid accidental backend calls.
const mockApi = {
  post: async () => ({ data: { token: 'demo-token' } }),
};

export default mockApi;
