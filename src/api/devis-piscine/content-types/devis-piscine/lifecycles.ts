module.exports = {
    async afterCreate(event) {
      const { result } = event;
  
      try {
        console.log('DEBUG DEVIS-PISCINE:', result);
  
        const toEmail = 'safidyramaroson.patrick@gmail.com';
  
        const nom = result.nom || 'Nom inconnu';
        const prenoms = result.prenoms || 'Non précisé';
        const email = result.email || 'Non renseigné';
        const tel = result.numero_telephone || 'Non renseigné';
        const codePostal = result.code_postal || 'Non renseigné';
        const commentaire = result.commentaire || 'Aucun commentaire';
  
        const forme = result.forme || 'Non précisé';
        const taille = result.taille || 'Non précisé';
        const couleur = result.couleur || 'Non précisé';
        const debut = result.debut || 'Non précisé';
        const installtion = result.installtion || 'Non précisé';
        const souhaiteContactYann = result.souhaite_contact_yann ? 'OUI' : 'NON';
  
        const emailText = `
  Vous avez reçu une nouvelle demande de devis piscine :
  
  👤 Infos personnelles :
  Nom : ${nom}
  Prénoms : ${prenoms}
  Email : ${email}
  Téléphone : ${tel}
  Code postal : ${codePostal}
  
  📐 Détails du projet :
  Forme : ${forme}
  Taille : ${taille}
  Couleur : ${couleur}
  Début souhaité : ${debut}
  Installation : ${installtion}
  Souhaite être contacté par Yann : ${souhaiteContactYann}
  
  📝 Commentaire :
  ${commentaire}
        `;
  
        await strapi.plugins['email'].services.email.send({
          to: toEmail,
          subject: `Demande de devis piscine – ${nom} ${prenoms}`,
          text: emailText,
        });
  
        console.log('E-mail devis piscine envoyé avec succès !');
      } catch (err) {
        strapi.log.error('Erreur lors de l’envoi de l’e-mail devis piscine :', err);
      }
    },
  };
  