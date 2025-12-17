export interface ReviewState {
  isLike: boolean;
  isDislike: boolean;
  likes: number;
  dislikes: number;
  userAction: "like" | "dislike" | null;
}

export type ReviewAction = { type: "LIKE" } | { type: "DISLIKE" } | null;

export const initialState = (review: {
  helpful_count: number;
  unhelpful_count: number;
}): ReviewState => ({
  isLike: false,
  isDislike: false,
  likes: review.helpful_count,
  dislikes: review.unhelpful_count,
  userAction: null,
});

export const reducer = (
  state: ReviewState,
  action: ReviewAction
): ReviewState => {
  switch (action?.type) {
    case "LIKE":
      if (state.userAction === "like") {
        return {
          ...state,
          likes: state.likes - 1,
          userAction: null,
        };
      }
      return {
        ...state,
        likes: state.likes + 1,
        dislikes:
          state.userAction === "dislike" ? state.dislikes - 1 : state.dislikes,
        userAction: "like",
      };
    case "DISLIKE":
      if (state.userAction === "dislike") {
        return {
        ...state,
        dislikes: state.dislikes - 1,
        userAction: null,
      };
      }
      return {
        ...state,
        dislikes: state.dislikes + 1,
        likes: state.userAction === "like" ? state.likes - 1 : state.likes,
        userAction: "dislike",
      };
    default:
      return state;
  }
};
