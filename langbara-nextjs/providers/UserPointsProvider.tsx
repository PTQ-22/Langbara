import React, { useContext, useState } from 'react'

interface UserData {
  points: number;
  addPoints: (points: number) => void;
  resetPoints: () => void;
}

// https://stackoverflow.com/questions/66106408/retrieve-data-server-side-and-save-in-context-with-next-js
// for now will just leave it for points only...
const UserPointsContext = React.createContext<UserData>({ points: -1, addPoints: () => {}, resetPoints: () => {} })

interface Props {
  children: React.ReactNode;
  startingPoints: number;
}

export function useUserPoints() {
  return useContext(UserPointsContext)
}

export const UserDataProvider = ({ children, startingPoints }: Props) => {

  const [points, setPoints] = useState(startingPoints);

  const addPoints = (added: number) => {
    setPoints(points + added);
  }

  const resetPoints = () => {
    setPoints(0);
  }

  return (
    <UserPointsContext.Provider value={{ points, addPoints, resetPoints  }}>
      { children }
    </UserPointsContext.Provider>
  )
}
