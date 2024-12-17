const $rdf = require('rdflib');
const ontologies = require('./ontologies');

function imprimirClasse(classe) {
    const classeURI = classe.subject.value;
    const classeLabel = classe.subject.label;

    console.log(`Classe: ${classeLabel}`);
    console.log(`URI: ${classeURI}`);
    console.log('---------------------------');
}

async function listarClasses() {
    const store = $rdf.graph();
  
    try {
        const response = await fetch(ontologies.PECO.url, { headers: { Accept: 'text/turtle' }, });
        if (!response.ok) throw new Error(`Erro ao buscar a ontologia: ${response.statusText}`);

        const ontologyData = await response.text();
        $rdf.parse(ontologyData, store, ontologies.PECO.url, 'text/turtle');
    
        const classes = store.match(null, ontologies.RDFS.namespace('isDefinedBy'), null);
        classes.forEach(imprimirClasse);

    } catch (error) {
        console.error('Erro ao processar a ontologia: ', error);
    }
}

listarClasses();
