import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './VerifyEmail.css';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

const VerifyEmail = () => {
    const { email } = useParams();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const resendEmail = async () => {
        setLoading(true);
        setEmailSent(false);
        setMessage("");

        try {
            const response = axios.post("/api/email/resend", { email });

            setMessage("L'e-mail de vérification a été renvoyé avec succès.");
            
        } catch(error) {
            console.log(error);
            setMessage("Une erreur s'est produite lors de l'envoi de l'e-mail.");
        }
        setLoading(false);
        setEmailSent(true);

        setTimeout(() => {
            setEmailSent(false);
        }, 20000);
    }
    
    return (
        <div class="nk-content" style={{backgroundColor: '#f4f7f3'}}>
            <div class="">
                <div class="nk-split-content nk-auth-container vh w-100">
                    <div className="nk-block nk-block-middle nk-auth-body">
                        <div className="card card-verify-email">
                            <div className="card-verify-email-header">
                                <div className="icon-card-container">
                                    <span>
                                        <MarkEmailReadOutlinedIcon />
                                    </span>
                                </div>
                            </div>
                            <div className="card-body">
                                 <h3 className="text-center">Verifier votre email</h3>
                                 <p className="mb-0">Vous êtes presque là ! Nous avons envoyé un e-mail de vérification à :</p>
                                 <p><b>{ email }</b></p>
                                 <p>
                                    Vérifiez votre boîte de réception et cliquez sur le lien pour vérifier votre compte. 
                                    Si vous ne trouvez pas l'email, vérifiez votre dossier de spam ou de courrier indésirable. Vous pouvez également demander un nouvel envoi en cas de problème.
                                 </p>
                                 <div className="d-flex justify-content-center">
                                    { !emailSent
                                      ? <button onClick={resendEmail} className="btn btn-success" disabled={ loading }>
                                         <span className="ml-1">{ loading ? "Renvoi en cours..." :"Renvoyer l'email"}</span>
                                       </button>
                                     :<p style={{color:'green'}}>{message}</p>}
                                 </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail;