import React, { createContext, PropsWithChildren, useCallback, useContext} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type Rate = 'Excellent' | 'Good' | 'Fair' | 'Bad';

export interface IFeedback {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: Rate;
  beverage: Rate;
  cleanliness: Rate;
  overall: Rate;
}

export interface IFeedbackContext {
  feedbacks: IFeedback[];
  addFeedback: (feedback: IFeedback) => void;
  deleteFeedbacks: (ids: IFeedback['id'][]) => void;
}

export const FeedbackContext = createContext<IFeedbackContext | null>(null);

export const useFeedbacks = () => {
  return useContext(FeedbackContext) as IFeedbackContext;
}

const FeedbackProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [data, setData] = useLocalStorage<IFeedbackContext['feedbacks']>('feedbacks', []);

  const addFeedback: IFeedbackContext['addFeedback'] = useCallback(async (feedback) => {
    setData(current => [feedback, ...current]);
  }, []);

  const deleteFeedbacks: IFeedbackContext['deleteFeedbacks'] = useCallback(async (ids) => {
    setData(current => {
      ids.forEach(id => {
        let index = current.findIndex(feed => feed.id === id);
        if(index > -1)
          current.splice(index, 1);
      })
      return [...current];
    });
  }, []);

  return (
    <>
      <FeedbackContext.Provider value={{feedbacks: [...data], addFeedback, deleteFeedbacks}}>
        {children}
      </FeedbackContext.Provider>
    </>
  )
}

export default React.memo(FeedbackProvider);