import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './VerifyEmail.css';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';

const VerifyEmail = () => {
    const { email } = useParams();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const resendEmail = async () => {
        setLoading(true);
        setEmailSent(false);
        setMessage("");

        try {
            const response = axios.post("/api/email/resend", { email });

            setMessage(t('verifyEmail.successMessage'));
            
        } catch(error) {
            console.log(error);
            setMessage(t('verifyEmail.errorMessage'));
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
                                 <h3 className="text-center">{t('verifyEmail.title')}</h3>
                                 <p className="mb-0">{t('verifyEmail.almostThere')}</p>
                                 <p><b>{ email }</b></p>
                                 <p>
                                    {t('verifyEmail.instructions')}
                                 </p>
                                 <div className="d-flex justify-content-center">
                                    { !emailSent
                                      ? <button onClick={resendEmail} className="btn btn-success" disabled={ loading }>
                                         <span className="ml-1">{ loading ? t('verifyEmail.resending') : t('verifyEmail.resendButton')}</span>
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