const rdf = require('rdflib');

const sparqlEndpoint = 'https://sparql.cf.linkeddata.es/cf';

async function querySparqlEndpoint() {
    const store = rdf.graph();

    const sparqlQuery = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?subject ?label
        WHERE {
            ?subject rdf:type rdfs:Class .
            ?subject rdfs:label ?label .
        }
        LIMIT 10
    `;

    const query = rdf.SPARQLToQuery(sparqlQuery, false, store);


    try {
        const results = await rdf.fetcher(store).load(sparqlEndpoint, {
            method: 'POST',
            body: query,
            //body: sparqlQuery,
            headers: { 'Content-Type': 'application/sparql-query' },
        });

        console.log('Resultados da consulta:');
        results.forEach(result => {
            console.log(`Sujeito: ${result.subject.value}`);
            console.log(`Predicado: ${result.predicate.value}`);
            console.log(`Objeto: ${result.object.value}`);
            console.log('---');
        });

    } catch (error) {
        console.error('Erro ao consultar:', error);
    }
}

querySparqlEndpoint();
