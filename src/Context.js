import React ,{useState, useEffect}from "react"

const Context = React.createContext()

function ContextProvider({children}) {

    const [allPhotos, setAllPhotos] = useState([])
    const [cartItems , setCartItems] = useState([])
    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
    
    function toggleFavorite (id){
         const updatedArr = allPhotos.map(photo => {
             if(photo.id === id) {
            return {...photo, isFavorite: !photo.isFavorite}
             }
        return photo
        })
        setAllPhotos(updatedArr)
    }

    function addToCart(newItme){
        setCartItems(prev => [...prev , newItme])
    }
    function removeFromCart(itme){
        setCartItems(prev=>
            prev.filter(photos=> photos.id !== itme)
        )
    }
    function emptyCart() {
        setCartItems([])
    }
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setAllPhotos(data))
    }, [])
    
    return (
        <Context.Provider value={{allPhotos,toggleFavorite, addToCart , cartItems, removeFromCart,emptyCart}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}