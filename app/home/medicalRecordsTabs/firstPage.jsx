import { Text, View, ScrollView } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import Input from '../../../components/Input'
import React from 'react'
import { useGlobalContext } from '../../../context/GlobalContect'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale'

const FirstPage = () => {

    const {user} = useGlobalContext();
    
  return (
      <SafeAreaProvider>
            <SafeAreaView className="px-1 h-full flex-1  bg-[#F7F7F8]" edges={['top']}>
                <ScrollView className=" " contentInsetAdjustmentBehavior="automatic" >
                    <View className=" w-full my-auto flex flex-col gap-y-6 items-center mt-1  px-2">
                        <Text className="font-bold text-[20px] text-black-100">Page 1</Text>
                        <View className='w-full flex flex-col gap-y-2 px-4 mt-2'>
                            <Input
                                label="Nom"
                                className="w-full border"
                                value={user.name}
                                readOnly={true}
                                inputStyle={'opacity-[0.5]'}
                                placeholder={'Entrez votre nom'}
                                />
                            <Input
                                label="Postnom"
                                className="w-full border"
                                value={user.surname}
                                readOnly={true}
                                inputStyle={'opacity-[0.5]'}
                                placeholder={'Entrez votre nom'}
                                />
                            <Input
                                label="Prénom"
                                className="w-full border"
                                value={user.firstname}
                                readOnly={true}
                                inputStyle={'opacity-[0.5]'}
                                placeholder={'Entrez votre nom'}
                                />
                            <Input
                                label="Date de naissance"
                                className="w-full border"
                                value={format(user.birthdate, 'dd MMMM yyyy', { locale: fr })}
                                readOnly={true}
                                inputStyle={'opacity-[0.5]'}
                                placeholder={'Entrez votre nom'}
                                />
                            <Input
                                label="Sexe"
                                className="w-full border"
                                value={user.gender=='male'? 'Masculin': 'Féminin'}
                                readOnly={true}
                                placeholder={'Entrez votre nom'}
                                />
                            <Input
                                label="Sexe"
                                className="w-full border"
                                value={user.phone}
                                readOnly={true}
                                inputStyle={'opacity-[0.5]'}
                                placeholder={'Entrez votre nom'}
                                />
                        </View>
                    </View>
                    <Text className=' mt-6 italic opacity-[0.5] text-center'>Ces informations ci-haut ont été extraites de votre profil</Text>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
  )
}

export default FirstPage