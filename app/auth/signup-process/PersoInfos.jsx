import { StyleSheet, Text, View, ScrollView, Button, Pressable, Platform } from 'react-native'
import React,  { useState }  from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton';
import Input from '../../components/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalDropdown from 'react-native-modal-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';


const PersoInfos = ({ route }) => { 
  const { email, password } = route.params;
     const [date, setDate] = useState(new Date());
     const [open, setOpen] = useState(false);
     const navigation = useNavigation();

    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [birthdate, setBirthdate] = useState(date);
    const [gender, setGender] = useState("");
    const [nameIsInvalid, setNameIsInvalid] = useState(false);
    const [firstnameIsInvalid, setFirstnameIsInvalid] = useState(false);
    const [surnameIsInvalid, setSurnameIsInvalid] = useState(false);
    const [birthdateIsInvalid, setBirthdateIsInvalid] = useState(false);
    const [genderIsInvalid, setGenderIsInvalid] = useState('Sexe');

    const formatDate = (rawDate) => {
      let date = new Date(rawDate);

      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      month = month < 10 ? `0${month}` : month;
      day = day < 10 ? `0${day}` : day;

      return `${day}-${month}-${year}`;
    }
    const changeDate = ({type},selectedDate) => {
      if(type == "set"){
        const currentDate = selectedDate;
        setDate(currentDate);
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
    function checkInfos(){
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

  function submit() {
    const canSubmit = checkInfos();
    if(canSubmit)
        navigation.navigate('PhoneNumber', { email: email, password: password, name: name, surname: surname, firstname: firstname, gender: gender, birthdate: birthdate})
}
  return (
    <SafeAreaView className=" px-4 h-full flex-1">
    <ScrollView className=""
       contentContainerStyle={{
       height: "100%",}}>
  <View className=" w-full my-auto flex justify-between items-center h-full py-6 px-2">
       <View className="">
           <Text className="font-bold text-center">
               Medical App Logo
           </Text>
       </View>
       <View className=" my-2  w-full flex my-auto">
           <Text className="font-bold text-left mb-4 text-[18px]">
               Informations Personelles
           </Text>
           <View className="">
           <View className="mb-6">
               <Input
                   label="Nom"
                   className="w-full border"
                   value={name}
                    onUpdateValue={(e) => setName(e)}
                   placeholder={'Entrez votre nom'}
                   isInvalid={nameIsInvalid}
                   ErrorText={"Ce champ est obligatoire*"}
                   />
               <Input
                   label="Postnom"
                   className="w-full"
                   value={surname}
                    onUpdateValue={(e) => setSurname(e)}
                   placeholder={'Entrez votre postnom'}
                   isInvalid={surnameIsInvalid}
                    ErrorText={"Ce champ est obligatoire*"}
                   />
               <Input
                   label="Prénom"
                   className="w-full"
                   value={firstname}
                   onUpdateValue={(e) => setFirstname(e)}
                   placeholder={'Entrez votre prénom'}
                   isInvalid={firstnameIsInvalid}
                    ErrorText={"Ce champ est obligatoire*"}
                   />
                 <View className="my-2">

                    {!open && (
                        <Pressable onPress={() => setOpen(!open)}>
                            <Input
                            label="Date de naissance"
                            className="w-full"
                            value={birthdate}
                            onUpdateValue={(e) => setBirthdate(e)}
                            placeholder={'Entrez votre date de naissance'}
                            isInvalid={birthdateIsInvalid}
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
                        onChange={changeDate}
                        style={styles.datepicker}
                        />
                    )}
                     {open && Platform.OS === "ios" && (
                        <View  className='mx-auto'>
                            <CustomButton
                              title="Confirmer"
                              handlePress={consfirmIOSDate}
                              containerStyles="w-[150px] mt-1 font-bold rounded-full bg-gray-200  "
                              textStyles={"text-primary-100"}/>
                        </View>
                    )}
                   
                 </View>
                 <View className="my-2">
                    <Text  style={styles.label}>Sexe :</Text>
                    <View   className='border-primary border h-14 w-full flex items-center justify-center rounded-[8px] px-2 '>
                        <RNPickerSelect
                            onValueChange={(e) => setGender(e)}
                            style={styles.dropdown}
                            items={[
                            { label: 'Masculin', value: 'male' },
                            { label: 'Féminin', value: 'female' },
                            ]}
                        />
                    </View>
                 </View>
           </View>
            <CustomButton
               title="Continuer"
               handlePress={submit}
               containerStyles="w-full mt-4 font-bold rounded-full bg-primary-200 "/>
           </View>
       </View>
   </View>

   </ScrollView>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
    dropdown: {
        width: "100%",
        height: 40,
        borderColor: '#6DB9EF',
        color: 'red',     
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      dropdownText: {
        fontSize: 16,
      },
      dropdownStyle: {
        width: 150,
      },
      label: {
        color: '#1E1E1E',
        fontWeight: 'bold',
        marginBottom: 4,
      },
      labelInvalid: {
        color: 'red',
      },
      datepicker: {
        height: 120
      }
})

export default PersoInfos;