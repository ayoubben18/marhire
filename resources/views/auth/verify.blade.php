@extends('layouts.register_layout')

@section('meta')
    <meta name="title" value="Devenir client">
    <meta name="description" value="Créer votre compte client et accéder à toutes les fonctionnalités de systeme.">
@endsection 
@section('content')
<style>
    .nk-auth-body, .nk-auth-footer {
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}
.card-verify-email {
    border-radius: 10px;
}
.card-verify-email h3 {
    margin-bottom: 29px;
    font-size: 15pt;
}
.card-verify-email p {
    text-align: center;
    color: black;
    max-width: 480px;
    margin: 0 auto;
    margin-bottom: 31px;
}
.card-verify-email-header {
    display: flex;
    justify-content: center;
    position: relative;
    top: -26px;
}
.icon-card-container {
    width: 70px;
    height: 70px;
    background: #f4f7f3;
    border-radius: 60%;
}
.btn-success {
    padding: 7px 17px;
    border-radius: 32px;
}
</style>
<div class="nk-main" style="background-color:#f4f7f3;">
    <div class="nk-wrap nk-wrap-nosidebar">
        <div class="nk-content ">
            <div class="">
                <div class="nk-split-content nk-auth-container vh w-100">
                    <form action="{{ route('client.create_compte') }}" method="post">
                        @csrf
                    
                    <div class="nk-block nk-block-middle nk-auth-body">
                        <div class="card card-verify-email">
                            <div class="card-verify-email-header">
                                <div class="icon-card-container">
                                    <span><i class="fa-solid fa-envelope-open-text"></i></span>
                                </div>
                            </div>
                            <div class="card-body">
                                 <h3 class="text-center">Please verify your email</h3>
                                 <p>
                                     Your almost there! We sent an email to <br>
                                     <b>charafchaouki126@gmail.com</b>
                                 </p>
                                 <p>
                                    Vérifiez votre boîte de réception et cliquez sur le lien pour vérifier votre compte.

Si vous ne trouvez pas l'email, vérifiez votre dossier de spam ou de courrier indésirable. Vous pouvez également demander un nouvel envoi en cas de problème.
                                 </p>
                                 <div class="d-flex justify-content-center">
                                     <a href="" class="btn btn-success">
                                         <span class="ml-1">Renvoyer l'email</span>
                                     </a>
                                 </div>
                            </div>
                         </div>
                    </div>
                    </form>
                </div>
                
            </div>
        </div>
    </div>
</div>
@endsection
