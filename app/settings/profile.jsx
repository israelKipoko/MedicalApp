import { View, ScrollView, Image,StyleSheet, TouchableOpacity, Pressable, Platform,Text } from 'react-native'
import React, {use, useEffect, useState} from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { Camera, ArrowLeftIcon } from 'lucide-react-native';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import FlatButton from '../../components/FlatButton';  
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
 import * as ImagePicker from 'expo-image-picker';
 import * as ImageManipulator from 'expo-image-manipulator';
 import * as FileSystem from 'expo-file-system';
import { modifyAccount } from '../../backend/appwrite';
import { useGlobalContext } from '../../context/GlobalContect';

const Profile = () => {
    const { user, updateUserInfo } = useGlobalContext();
    const navigation = useNavigation();

    const [openGenderPicker, setOpenGenderPicker] = useState(false);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date(user.birthdate));
    const [IsSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [firstname, setFistname] = useState(user.firstname);
    const [gender, setGender] = useState(user.gender);
    const [genderLabel, setGenderLabel] = useState(user.gender==='male' ? 'Masculin' : 'Féminin');
    const [image, setImage] = useState("");
    const [birthdate, setBirthdate] = useState(user.birthdate);
    const [nameIsInvalid, setNameIsInvalid] = useState(false);
    const [firstnameIsInvalid, setFirstnameIsInvalid] = useState(false);
    const [surnameIsInvalid, setSurnameIsInvalid] = useState(false);
    const [birthdateIsInvalid, setBirthdateIsInvalid] = useState(false);
    const [genderIsInvalid, setGenderIsInvalid] = useState(false);

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
  
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
  
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
  
        return `${year}-${month}-${day}`;
      }

    const changeGender = (itemValue, itemIndex) => {
        setGender(itemValue);
        checkChanges()
        if (itemValue === "male") {
          setGenderLabel("Masculin");
        }else{
          setGenderLabel("Féminin");
        }
        setOpenGenderPicker(!openGenderPicker);
      }
    const changeDate = ({type},selectedDate) => {
        if(type == "set"){
            const currentDate = selectedDate;
            let formattedDate = formatDate(currentDate.toDateString());
             setDate(currentDate);
            setBirthdate(format(formattedDate, 'dd MMMM yyyy', { locale: fr }));
            checkChanges();
            if(Platform.OS === 'android'){
                setOpen(!open);
                let formattedDate = formatDate(currentDate.toDateString())
                setBirthdate(formattedDate);
            }
        }else{
            setOpen(!open);
        }
    }
    const consfirmIOSDate = () => {
        let formattedDate = formatDate(date.toDateString())
        setBirthdate(formattedDate);
        setOpen(!open);
        }
    async function uploadImage() {

         const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

         if(permissionResult.granted){
             let result = await ImagePicker.launchImageLibraryAsync({
                 mediaTypes: ['images'],
                 allowsEditing: true,
             });

             if (!result.canceled) {
                 const uploadedImage = result.assets[0];

                  const fileInfo = await FileSystem.getInfoAsync(uploadedImage.uri);

                  let fileUri = uploadedImage.uri;
                 if (fileInfo.size > 40 * 1024 * 1024) {
                     const manipulatedImage = await ImageManipulator.manipulateAsync(
                         uploadedImage.uri,
                         [{ resize: { width: 800 } }],
                         { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
                       );
                       fileUri = manipulatedImage.uri;
                 }

                setImage(fileUri);
                checkChanges();
               }
         }else{
            console.log("Permission denied");
         }
    };

    async function saveUpdate() {
        setIsLoading(true);
        const canSave = checkValidity();
        if(canSave){
            let params = {
                name: name,
                surname: surname,
                firstname: firstname,
                gender: gender,
                birthdate: birthdate,
                avatar: image,
            }
            await modifyAccount(params,user.$id)
            .then(() => {
                setIsLoading(false);
                navigation.goBack();
                updateUserInfo();
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
        }
    }
    function checkChanges() {
         setIsSaveButtonEnabled(name !== user.name || surname !== user.surname || firstname !== user.firstname ||  gender !== user.gender || birthdate !== user.birthdate || image !== user.avatar); 
    }
    function checkValidity() {
        let nameIsValid = true;
        let firstnameIsValid = true;
        let surnameIsValid = true;
        let genderIsValid = true;
        let birthdateIsValid = true;
        if (name === "") {
        setNameIsInvalid(true);
        nameIsValid = false;
        }else{
        setNameIsInvalid(false);
        nameIsValid = true;
        }

        if (surname === "") {
        setSurnameIsInvalid(true);
        surnameIsValid = false;
        }else{
        setSurnameIsInvalid(false);
        surnameIsValid = true;
        }

        if (firstname === "") {
        setFirstnameIsInvalid(true);
        firstnameIsValid = false;
        }else{
        setFirstnameIsInvalid(false);
        firstnameIsValid = true;
        }

        if (birthdate === "") {
        setBirthdateIsInvalid(true);
        birthdateIsValid = false;
        }else{
        setBirthdateIsInvalid(false);
        birthdateIsValid = true;
        }

        if (gender === "") {
        setGenderIsInvalid(true);
        genderIsValid = false;
        }else{
        setGenderIsInvalid(false);
        genderIsValid = true;
        }
        return (nameIsValid && surnameIsValid && firstnameIsValid && genderIsValid && birthdateIsValid);
    }

    // useEffect(() => {
    //     const t = checkChanges();
    //     console.log(t);
    // }, []);
  return (
    <SafeAreaProvider>
        <SafeAreaView className="px-1 h-full flex-1 bg-[#FEFEFE] py-2">
            <View>
                <FlatButton onPress={()=> navigation.goBack()} Icon={ArrowLeftIcon} buttonStyles={"absolute -top-1 z-10 p-1 left-2 flex flex-row items-center"} textStyles={"text-primary-200 "}>
                    Retour
                </FlatButton>
            </View>
            <ScrollView className=' '>
                        <View className='flex items-center mt-4'>
                            <View  className=" w-24 h-24 relative" >
                                {image===""? 
                                <Image source={{ url: user?.avatar }} resizeMode='contain' alt="avatar" className="w-full h-full rounded-full"/>
                                :
                                <Image source={{ uri: image }} resizeMode='contain' alt="avatar" className="w-full h-full rounded-full"/>
                                }
                                <TouchableOpacity onPress={uploadImage} className=" rounded-full bg-[#1E1E2D22] absolute inset-0 w-full h-full flex justify-center items-center">
                                    <Camera size={30} color={'#fff'} />
                                </TouchableOpacity>
                            </View>
                            <View className='w-full flex flex-col gap-y-2 px-4 mt-2'>
                                <Input
                                    label="Nom"
                                    className="w-full border"
                                    value={name}
                                    onUpdateValue={(e) =>{setName(e); checkChanges()}}
                                    placeholder={'Entrez votre nom'}
                                    />
                                <Input
                                    label="Postnom"
                                    className="w-full border"
                                    value={surname}
                                    onUpdateValue={(e) => {setSurname(e); checkChanges()}}
                                    placeholder={'Entrez votre postnom'}
                                    />
                                <Input
                                    label="Prénom"
                                    className="w-full border"
                                    value={firstname}
                                    onUpdateValue={(e) =>{setFistname(e); checkChanges()}}
                                    placeholder={'Entrez votre prénom'}
                                    />
                               <View className=''>
                                    {!openGenderPicker && (
                                        <Pressable onPress={() => setOpenGenderPicker(!openGenderPicker)}>
                                            <Input
                                            label={"Sexe"}
                                            className="capitalize w-full"
                                            value={genderLabel}
                                            onUpdateValue={(e) =>{ setGender(e)}}
                                            pressIn={() => setOpenGenderPicker(!openGenderPicker)}
                                            />
                                        </Pressable>
                                    )}
                                        {openGenderPicker && (
                                       
                                        <View className="-mt-16 mb-1">
                                            <Picker
                                                selectedValue={gender}
                                                onValueChange={changeGender}>
                                                <Picker.Item label="Masculin" value="male" />
                                                <Picker.Item label="Féminin" value="female" />
                                            </Picker>
                                            <View  className='ml-auto'>
                                                <CustomButton
                                                title="Annuler"
                                                handlePress={() => setOpenGenderPicker(false)}
                                                containerStyles="w-[150px] font-bold -mt-4 rounded-lg bg-gray-200"
                                                textStyles={"text-primary-100"}/>
                                            </View>
                                        </View>
                                        )}
                                </View>
                                <View >
                                    {!open && (
                                        <Pressable onPress={() => setOpen(!open)}>
                                            <Input
                                            label="Date de naissance"
                                            className="w-full capitalize"
                                            value={format(birthdate, 'dd MMMM yyyy', { locale: fr })}
                                            onUpdateValue={(e) => {setBirthdate(e)}}
                                            placeholder={'Entrez votre date de naissance'}
                                            ErrorText={"Ce champ est obligatoire*"}
                                            pressIn={() => setOpen(!open)}
                                            />
                                        </Pressable>
                                    )}
                                    {open && (
                                        <DateTimePicker 
                                        mode='date'
                                        display='spinner'
                                        value={date}
                                        onChange={changeDate}/>
                                    )}
                                    {open && Platform.OS === "ios" && (
                                        <View  className=' flex flex-row justify-evenly '>
                                            <CustomButton
                                            title="Confirmer"
                                            handlePress={consfirmIOSDate}
                                            containerStyles="w-[150px]  font-bold rounded-lg bg-primary-200"/>
                                             <CustomButton
                                                title="Annuler"
                                                handlePress={() => setOpen(false)}
                                                containerStyles="w-[150px] font-bold  rounded-lg bg-gray-200"
                                                textStyles={"text-primary-100"}/>
                                        </View>
                                    )}
                                </View>

                                <CustomButton
                                    title="Sauvegarder"
                                    handlePress={saveUpdate}
                                    containerStyles="w-full mt-12 font-bold rounded-lg bg-primary-200"
                                    isDisabled={!IsSaveButtonEnabled}
                                    isLoading={isLoading}/>
                            </View>
                        </View>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  
  )
}

const styles = StyleSheet.create({
    parentStyle: {
        position: "relative",
    },
    cameraStyle: {
        position: "absolute",
    },
  });
export default Profile