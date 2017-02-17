<?php
// List of events
 $json = array();

 // Query that retrieves events
 $requete = "SELECT idAgenda,title,start,end FROM Agenda Where status = '1'";

 // connection to the database
 try {
 $bdd = new PDO('mysql:host=localhost;dbname=agenda', 'root', 'root');
 } catch(Exception $e) {
  exit('Unable to connect to database.');
 }
 // Execute the query
 $resultat = $bdd->query($requete) or die(print_r($bdd->errorInfo()));
//var_dump($resultat->fetchAll(PDO::FETCH_ASSOC));
 // sending the encoded result to success page
 echo json_encode($resultat->fetchAll(PDO::FETCH_ASSOC));

?>
