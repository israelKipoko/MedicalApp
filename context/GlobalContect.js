import React, { createContext, useContext, useRef,useCallback, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native'
import SettingsLayout from '../app/settings/_layout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';
  import { getCurrentUser, getAccount, triggerAlert } from '../backend/appwrite';
  

const context = createContext();
export const useGlobalContext = () => useContext(context);

function GeneralContectProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertAction, setAlertAction] = useState(false);

  const bottomSheetModalRef = useRef(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.close();
  };
  const getUser = async () => { 
    getCurrentUser()
    .then((res) => {
        setUser(res);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  const checkLogin = async () => {
    getAccount()
        .then((res) => {
           setIsLoggedIn(true);
           closeBottomSheet();
           getUser();
        })
        .catch((error) => {
          console.log(error);
          setIsLoggedIn(false);
        })

  }
  const updateUserInfo = () => {
    getUser(); 
  };

  const alertFunction  = async () => {
    triggerAlert(user.isAlerting, user.$id)
    .then(() =>{
      updateUserInfo();
    }).catch((error)=>{
      console.log(error)
    })
  }

  useEffect(() => { 
    checkLogin();
    getUser();
  }, []);
  return (
    
    <context.Provider value={{ openBottomSheet, closeBottomSheet, user, updateUserInfo, isLoggedIn, checkLogin, alertFunction }}>
      <GestureHandlerRootView>
                <BottomSheetModalProvider>
      {children}
      <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={['93%']} enableOverDrag={false}   enableDynamicSizing={false} animateOnMount={true}>
              <SettingsLayout/>
      </BottomSheetModal>
       </BottomSheetModalProvider>
            </GestureHandlerRootView>
    </context.Provider>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    zIndex: 100,
  },
});
export default GeneralContectProvider;
