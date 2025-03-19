
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Navbar from './componants/Navbar';
import Home from './componants/Home';
import Product from './componants/Product';
import Latest from './componants/Latest';
import Register from './componants/Register';
import LoginForm from './componants/Login';
import DetailProduct from "./componants/DetailProduct";
import AdminInfo from "./Dashboard/AdminInfo";
import Sidebar from "./Dashboard/Sidebar";
import Dashboard from "./Page/Dashboard";
import Footer from "./componants/Footer";
import Template from "./componants/Template";
import Update from "./Dashboard/Update";
import CategoryLocal from "./componants/CategoryLocal";
import Beauty from "./HomePage/Beauty";
import ForgetPassword from "./componants/ForgetPassword";
import ResetPassword from "./componants/ResetPassword";

const App = () => {


  return (
    <div  > 
       
       <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
      
        <Route path='/Product' element={<Product/>}/>
      
        <Route path='/Latest' element={<Latest/>}/>
        <Route path='/Product/:id' element={<DetailProduct/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/Profile' element={<AdminInfo/>}/>
        <Route path='/Sidebar' element={<Sidebar/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<LoginForm/>}/>
        <Route path="/CategoryLocal" element={<CategoryLocal/>}></Route>
        <Route path="/ForgetPassword" element={<ForgetPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
       </Routes>
       <Footer/>
          
    </div>
  )
}

export default App;