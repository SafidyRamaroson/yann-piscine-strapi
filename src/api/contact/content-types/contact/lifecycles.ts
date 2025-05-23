module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      console.log('DEBUG CONTACT:', result);

      const toEmail = 'safidyramaroson.patrick@gmail.com';
      const nom = result.nom || 'Nom inconnu';
      const prenoms = result.prenoms || 'Non précisé';
      const tel = result.numero_telephone || 'Non renseigné';
      const email = result.email;
      const message = result.message || '';

      await strapi.plugins['email'].services.email.send({
        to: toEmail,
        subject: `Nouveau message de ${nom} ${prenoms}`,
        text: `
Vous avez reçu un nouveau message via le formulaire de contact :

Nom : ${nom}
Prénoms : ${prenoms}
Téléphone : ${tel}
Email : ${email}

Message :
${message}
        `,
      });

        console.log('emailClient',email)
        await strapi.plugins['email'].services.email.send({
          to: email,
          subject: 'Accusé de réception - Votre demande a bien été reçue',
          text: `
Bonjour ${prenoms || nom},

Nous vous remercions pour votre message. Votre demande a bien été reçue et nous y répondrons dans les plus brefs délais.

Résumé de votre message :
-------------------------
Nom : ${nom}
Prénoms : ${prenoms}
Téléphone : ${tel}
Email : ${email}

Message :
${message}

Cordialement,
L'équipe de Yann Piscine
          `,
        });
        console.log('Accusé de réception envoyé à l’utilisateur.');
        console.warn('Adresse email de l’utilisateur non fournie, aucun accusé de réception envoyé.');
    } catch (err) {
      strapi.log.error('Erreur lors de l’envoi des e-mails :', err);
    }
  },
};
