import { createContext, useContext, useReducer, useEffect } from "react";

const FavoritesContext = createContext();

const favoritesReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const isExist = state.find(item => item.id === action.payload.id);
            if (isExist) {
                return state.filter(item => item.id !== action.payload.id);
            }
            return [...state, action.payload];
        
            case 'REMOVE_FAVORITE':
                return state.filter(item => item.id !== action.payload);

            case 'CLEAR_ALԼ':
                return [];

            default:
                return state;
    }
};

export const FavoritesProvider = ({children}) => {
    const initialState = JSON.parse(localStorage.getItem('favorites')) || [];

    const [favorites, dispatch] = useReducer(favoritesReducer, initialState);
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoritesContext.Provider value = {{ favorites, dispatch }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
