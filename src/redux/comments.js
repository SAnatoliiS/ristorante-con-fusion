import { COMMENTS } from "../shared/comments";
import * as ActionTypes from "./ActionTypes";

export const Comments = (state = COMMENTS, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_COMMENT:
      const comment = {
        ...payload,
        id: state.length,
        date: new Date().toISOString()
      };
      return [...state, comment];
    default:
      return state;
  }
};
