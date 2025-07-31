<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->nullable();
            $table->string('prenom')->nullable();
            $table->string('cin')->nullable();
            $table->string('ville')->nullable();
            $table->string('zone')->nullable();
            $table->text('adresse')->nullable();
            $table->string('codepostal')->nullable();
            $table->string('pays')->default('Maroc');
            $table->string('type_compte')->default('admin');
            $table->string('banque')->default(-1);
            $table->string('marque')->nullable();
            $table->string('business_url')->nullable();
            $table->text('rip')->nullable();
            $table->string('email')->unique();
            $table->integer('valide_compte')->default(0);
            $table->integer('id_agence')->default(-1);
            $table->string('image')->default('images/profiles/default.png');
            $table->string('telephone')->nullable();
            $table->string('telephone2')->nullable();
            $table->string('forme_juridique')->default('Individual');
            $table->string('rc')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('par_bl')->default(1);
            $table->integer('par_colis')->default(1);
            $table->integer('par_fact')->default(1);
            $table->integer('par_demande_ramassage')->default(1);
            $table->integer('par_clients')->default(1);
            $table->integer('par_livreurs')->default(1);
            $table->integer('par_ramassage')->default(1);
            $table->integer('par_utilisateurs')->default(1);
            $table->integer('par_settings')->default(1);
            $table->integer('par_distribution')->default(1);
            $table->integer('par_retours')->default(1);
            $table->integer('par_stocks')->default(1);
            $table->integer('par_brands')->default(1);
            $table->integer('par_reclamations')->default(1);
            $table->integer('par_staff')->default(1);
            $table->integer('par_sous_livreurs')->default(1);
            $table->integer('par_emballages')->default(1);
            $table->integer('par_annonces')->default(1);
            $table->integer('par_connect')->default(1);
            $table->double('client_tarif_livraison')->nullable();
            $table->double('client_tarif_annulation')->nullable();
            $table->double('client_tarif_retour')->nullable();
            $table->string('google_id')->nullable();
            $table->string('cni_recto')->nullable();
            $table->string('cni_recto_filename')->nullable();
            $table->string('cni_verso')->nullable();
            $table->string('cni_verso_filename')->nullable();
            $table->string('rib_file')->nullable();
            $table->integer('id_client')->default(-1);
            $table->text('api_token')->nullable();
            $table->text('secret_key')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
