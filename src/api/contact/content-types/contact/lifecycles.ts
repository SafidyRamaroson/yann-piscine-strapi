module.exports = {
  async afterCreate(event) {
    const { result } = event;

    try {
      console.log('DEBUG CONTACT:', result);

      const toEmail = 'safidyramaroson.patrick@gmail.com';
      const nom = result.nom || 'Nom inconnu';
      const prenoms = result.prenoms || 'Non précisé';
      const tel = result.numero_telephone || 'Non renseigné';
      const email = result.email || 'Non renseigné';
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
      console.log('E-mail de contact envoyé avec succès !');
    } catch (err) {
      strapi.log.error('Erreur lors de l’envoi de l’e-mail de contact :', err);
    }
  },
};
