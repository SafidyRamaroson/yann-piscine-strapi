module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      console.log('DEBUG DEVIS-PISCINE:', result);

      const toEmail = 'safidyramaroson.patrick@gmail.com';

      const nom = result.nom || 'Nom inconnu';
      const prenoms = result.prenoms || 'Non précisé';
      const email = result.email;
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
Email : ${email || 'Non renseigné'}
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

      // Envoi à l'administrateur
      await strapi.plugins['email'].services.email.send({
        to: toEmail,
        subject: `Demande de devis piscine – ${nom} ${prenoms}`,
        text: emailText,
      });

      console.log('E-mail devis piscine envoyé avec succès !');

      // Envoi de l'accusé de réception à l'utilisateur
      const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (isValidEmail) {
        await strapi.plugins['email'].services.email.send({
          to: email,
          subject: 'Votre demande de devis – Yann Piscine',
          text: `
Bonjour ${prenoms},

Nous vous remercions pour votre demande de devis.
Notre équipe l’a bien reçue et vous recontactera dans les plus brefs délais.

Voici un résumé de votre demande :

- Forme : ${forme}
- Taille : ${taille}
- Couleur : ${couleur}
- Début souhaité : ${debut}
- Installation : ${installtion}
- Téléphone : ${tel}
- Code postal : ${codePostal}

Commentaire :
${commentaire}

Merci pour votre confiance,
L’équipe Yann Piscine
          `,
        });

        console.log('Accusé de réception envoyé à l’utilisateur.');
      } else {
        console.warn('Email utilisateur invalide ou non fourni, accusé de réception non envoyé.');
      }

    } catch (err) {
      strapi.log.error('Erreur lors de l’envoi des e-mails devis piscine ou accusé de réception :', err);
    }
  },
};
