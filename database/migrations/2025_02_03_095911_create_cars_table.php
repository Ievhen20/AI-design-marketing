<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('cars', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('company_id');
      $table->unsignedBigInteger('user_id');
      $table->string('model');
      $table->decimal('horse_power', 10, 2)->nullable();
      $table->string('manufactured_year')->nullable();
      $table->string('color')->nullable();
      $table->string('fuel_type')->nullable();
      $table->string('in_service')->nullable();
      $table->decimal('cost', 10, 2)->nullable();
      $table->string('image')->nullable();
      $table->timestamps();

      // foreignkey connection 
      $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
  }



  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('cars');
  }
};
