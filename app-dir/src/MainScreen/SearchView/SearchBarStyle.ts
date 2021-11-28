/**
 * SearchBarStyle: css-ing the search bar.
 * mainly used for the transition effect.
 * 
 */


export const SearchBarStyle = () => {
    
    const transitionDown = {
        transform: 'translate(0, 30vh)'
    };
    const resetTransform = {
        transform: 'translate(0, 0vh)'
    };
    const setTransform = {
        transition: 'transform 0.5s'
    };

    return ({
        setTransform,
        transitionDown, 
        resetTransform});
}