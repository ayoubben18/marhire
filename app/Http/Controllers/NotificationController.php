<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Notification;
use App\Models\Etat;
use Auth;

class NotificationController extends Controller
{
    public function getNotifications(Request $request)
    {
        $notifications = Notification::where('id_user', Auth::id())
                                      ->where('type', '!=', 'Message');

        $notifications = $notifications->latest()->get();

        $unseenNotificationsExist = $notifications->contains(function ($notification) {
            return $notification->seen == 0;
        });

        $html = '';
        
        foreach($notifications as $notification)
        {
            $formattedDate = $this->formatDateTime($notification->created_at->copy());
            $etatBadge = 'badge-warning';
            $iconBg = 'bg-warning-dim';

            if($notification->type == 'Colis')
            {
                $iconClass = "ni-box";
                $ville = isset($notification->colis->quartier) ?$notification->colis->quartier->zone : '';
                $etat = Etat::where('etat', $notification->etat_colis)->first();

                if($etat)
                    $etatBadge = $etat->badge;

                $notificationText = '
                        <div class="nk-notification-text mb-1">
                            <a class="see-colis" href="javascript:void(0);" data-toggle="modal" data-target="#viewColisModal" data-id="' . $notification->id_obj . '">
                            <span class="badge ' . $etatBadge . '">' . $notification->etat_colis . '</span> - ' .  $notification->code_colis . '</a>
                        </div>
                        <div class="nk-notification-text" style="color:#555;">' . $ville . '</div>
                ';
            }
            elseif($notification->type == 'Facture')
            {
                $iconBg = 'badge-success';
                $iconClass = "ni-money";
                $notificationText = '
                        <div class="nk-notification-text mb-1">' . $notification->message . '</div>
                ';
            }
            else
            {
                $iconClass = "ni-clock";
                $notificationText = '
                        <div class="nk-notification-text mb-1">' . $notification->message . '</div>
                ';
            }

            $html .= '<div class="nk-notification-item dropdown-inner">
                    <div class="nk-notification-icon">
                        <em class="icon icon-circle ' . $iconBg . ' ni ' . $iconClass . '"></em>
                    </div>
                    <div class="nk-notification-content">'
                        . $notificationText .   
                        '<div class="nk-notification-time" style="color:#555;">' . $formattedDate .'</div>
                    </div>
                </div>';
        }
        
        return response()->json([
            'html' => $html,
            'unseenNotificationsExist' => $unseenNotificationsExist
        ]);
    }
    public function getMessages(Request $request)
    {
        $notifications = Notification::where('id_user', Auth::id())
                                      ->where('type', 'Message');

        $notifications = $notifications->latest()->get();

        $unseenMessagesExist = $notifications->contains(function ($notification) {
            return $notification->seen == 0;
        });

        $html = '';
        
        foreach($notifications as $notification)
        {
            $formattedDate = $this->formatDateTime($notification->created_at->copy());
            $etatBadge = 'badge-warning';
            $iconBg = 'bg-warning-dim';
            $user = $notification->user ? '- ' . $notification->user->prenom . ' ' . $notification->user->nom: '';
           
            $iconClass = "ni-mail";
            $notificationText = '
                    <div class="nk-notification-text mb-1"><a class="see-colis" href="javascript:void(0);" data-toggle="modal" data-target="#viewColisModal" data-id="' . $notification->id_obj . '">' .  $notification->code_colis . $user . '</a></div>
                    <div class="nk-notification-text msg"style="color:#555;">' . $notification->message . '</div>
            ';

            $html .= '<div class="nk-notification-item dropdown-inner">
                            <div class="nk-notification-icon">
                                <em class="icon icon-circle ' . $iconBg . ' ni ' . $iconClass . '"></em>
                            </div>
                            <div class="nk-notification-content">'
                                . $notificationText .   
                                '<div class="nk-notification-time" style="color:#555;">' . $formattedDate .'</div>
                            </div>
                    </div>';
        }
        
        return response()->json([
            'html' => $html,
            'unseenMessagesExist' => $unseenMessagesExist
        ]);
    }

    public function seen(Request $request)
    {
        $notifications = Notification::where('id_user', Auth::id())
                                        ->where('seen', 0)
                                        ->where('type', '!=', 'Message')
                                        ->update([
                                            'seen' => 1
                                        ]);

        return 'success';
    }
    public function seenMessages(Request $request)
    {
        $notifications = Notification::where('id_user', Auth::id())
                                        ->where('seen', 0)
                                        ->where('type', 'Message')
                                        ->update([
                                            'seen' => 1
                                        ]);

        return 'success';
    }

    public function formatDateTime($date)
    {
        // Parse the input date
        $dateTime = Carbon::parse($date);

        $diffInSeconds = $dateTime->diffInSeconds();
        if ($diffInSeconds < 60) {
            return "$diffInSeconds seconds";
        }

        $diffInMinutes = $dateTime->diffInMinutes();
        if ($diffInMinutes < 60) {
            return "$diffInMinutes minutes";
        }

        $diffInHours = $dateTime->diffInHours();
        if ($diffInHours < 24) {
            return "$diffInHours heures";
        }

        return $dateTime->format('d-m-Y H:i');
    }
}
