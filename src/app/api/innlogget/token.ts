export const getFakeToken = async () => {
    const clientId = 'dev-gcp:teamfamilie:familie-ba-minside-soknad';
    const audience = `dev-gcp:teamfamilie:familie-integrasjoner`; // Hva skal være her?
    const url = `http://fakedings.intern.dev.nav.no/fake/tokenx?client_id=${clientId}&aud=${audience}&acr=Level4&pid=31458931375`;
    const token = await fetch(url).then(function (body) {
        return body.text();
    });
    return `Bearer ${token}`;
};
