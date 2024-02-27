export default function CheckPasswordStrength(password: string){
  console.log(123)
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password)
}