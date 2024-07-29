import { createContext, useState, useContext } from 'react';

const AppContext = createContext();
export const useUserContext = () => useContext(AppContext);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState('Rafa');
    const [todoList,setTodoList]=useState([]);
    return (
        <AppContext.Provider value={{user, setUser,todoList,setTodoList}}>
            {children}
        </AppContext.Provider>
    );
}

export default UserProvider;