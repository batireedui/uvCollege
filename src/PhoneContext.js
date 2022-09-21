import React, { useState } from 'react';
const PhoneContext = React.createContext();

export const PhoneValue = (props) => {
    const [isPhone, setisPhone] = useState("99323156");
    const [userId, setUserID] = useState("1");
    return (
        <PhoneContext.Provider value={{ isPhone, setisPhone, userId, setUserID }}>
            {props.children}
        </PhoneContext.Provider>
    )
};

export default PhoneContext;