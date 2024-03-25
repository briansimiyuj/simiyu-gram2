import { auth, firestore } from "../firebase/config"
import { setDoc, doc } from "firebase/firestore"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"

export const useSignUpWithEmail = () => {

    const [ createUserWithEmailAndPassword, user, loading, error ] = useCreateUserWithEmailAndPassword(auth)

    const signup = async(inputs) =>{

        if(!inputs.email || !inputs.password || !inputs.fullName || !inputs.username){

            console.log('Please fill in all the fields')
            
            return

        }
    
        try{
       
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)

            if(!newUser && error){

                console.log(error)

                return

            }
            
            
            if(newUser){

                const userDoc ={

                    username: inputs.username,
                    fullName: inputs.fullName,
                    email: inputs.email,
                    createdAt: Date.now(),
                    userId: newUser.user.uid,
                    following: [],
                    followers: [],
                    likes: [],
                    photos: [],
                    bio: '',
                    website: '',
                    profilePicURL: ''
                }

                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)

                localStorage.setItem("user-info", JSON.stringify(userDoc))

            }

       
        }catch(error){
       
           console.log(error)
       
        }
    
    }
  
    return{ loading, error, signup }

}