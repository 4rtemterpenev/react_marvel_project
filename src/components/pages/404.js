import ErrorMessage from "../errorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const Page404 = () =>{
  return (
    <div>
      <ErrorMessage />
      <p>СТРАНИЦА НЕ НАЙДЕНА</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  )
}


export default Page404;