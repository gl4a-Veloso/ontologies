const rdf = require('rdflib');
const fs = require('fs');
const ontologies = require('./ontologies.js');

const rdfFilePath = './peco.rdf';
const rdfContent = fs.readFileSync(rdfFilePath, 'utf-8');
const store = rdf.graph();

const baseURI = 'https://example.org/';

rdf.parse(rdfContent, store, baseURI, 'application/rdf+xml');

function displayTriples() {
    store.statementsMatching().forEach(triple => {
		console.log(`Sujeito: ${triple.subject.value}`);
		console.log(`Predicado: ${triple.predicate.value}`);
		console.log(`Objeto: ${triple.object.value}`);
		console.log('---');
  	});
}

function createInstances(){
	//EmissionObservation
	const EmissionObservation = rdf.sym(baseURI + 'instance/Obs1');
	store.add(EmissionObservation, 
			  ontologies.RDFS.namespace('type'), 
			  ontologies.PECO.namespace('EmissionObservation')
			 );
	store.add(EmissionObservation, 
			  ontologies.SOSA.namespace('hasResult'),
			  100
			 );

	// Instância de peco:EmissionCalculationActivity
	const emissionActivity = rdf.sym(baseURI + 'instance/EmissionActivity1');
	store.add(emissionActivity, 
		      ontologies.RDFS.namespace('type'), 
			  ontologies.PECO.namespace('EmissionCalculationActivity')
			 );
	store.add(emissionActivity, 
		      ontologies.PROV.namespace('used'), 
			  250
			 );
  
	// Instância de ecfo:EmissionCalculationFactor
	const emissionFactor = rdf.sym(baseURI + 'instance/EmissionFactor1');
	store.add(emissionFactor, 
		      ontologies.RDFS.namespace('type'), 
			  ontologies.ECFO.namespace('EmissionCalculationFactor')
			 );
	store.add(emissionFactor, 
		      ontologies.RDF.namespace('value'), 
			  0.19
			 );
}

function getValueOfInstance(instanceURI, predicateURI) {
	const triples = store.statementsMatching(
		rdf.sym(instanceURI), 
		rdf.sym(predicateURI), 
		null
	);

	if (triples.length > 0) {
		return parseFloat(triples[0].object.value);
	}
	return null;
}

function calculateEmission() {
	const observationURI = 'https://example.org/instance/Obs1';
	const activityURI = 'https://example.org/instance/EmissionActivity1';
	const factorURI = 'https://example.org/instance/EmissionFactor1';

	const hasResultURI = 'http://www.w3.org/ns/sosa/hasResult';
	const usedURI = 'https://www.w3.org/TR/prov-o/used';
	const valueURI = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#value';

	const observationValue = getValueOfInstance(observationURI, hasResultURI);
	const activityValue = getValueOfInstance(activityURI, usedURI);
	const emissionFactorValue = getValueOfInstance(factorURI, valueURI);

	if (observationValue !== null && activityValue !== null && emissionFactorValue !== null) {
		const result = (observationValue * activityValue) * emissionFactorValue;
		console.log(`Resultado da multiplicação: ${result}`);
	} else {
		console.log('Erro: Não foi possível encontrar todos os valores necessários.');
	}
}  

createInstances();

console.log('Exibindo todas as triplas:');
displayTriples();

calculateEmission();



