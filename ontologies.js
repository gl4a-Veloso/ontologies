const rdf = require('rdflib');

const rdfUrl = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
const rdfsUrl = 'http://www.w3.org/2000/01/rdf-schema#';
const owlUrl = 'http://www.w3.org/2002/07/owl#';
const provUrl = 'https://www.w3.org/TR/prov-o/';
const qudtUrl = 'http://qudt.org/schema/qudt/';
const timeUrl = 'https://www.w3.org/TR/owl-time/';
const skosUrl = 'https://www.w3.org/2004/02/skos/';
const sosaUrl = 'http://www.w3.org/ns/sosa/';
const ecfoUrl = 'https://w3id.org/ecfo#';
const pecoUrl = 'https://w3id.org/peco#';

const OWL = rdf.Namespace(owlUrl);
const RDF = rdf.Namespace(rdfUrl);
const RDFS = rdf.Namespace(rdfsUrl);
const PROV = rdf.Namespace(provUrl);
const QUDT = rdf.Namespace(qudtUrl);
const TIME = rdf.Namespace(timeUrl);
const SKOS = rdf.Namespace(skosUrl);
const SOSA = rdf.Namespace(sosaUrl);
const ECFO = rdf.Namespace(ecfoUrl);
const PECO = rdf.Namespace(pecoUrl);

const ontologies = {
  RDF: { url: rdfUrl, namespace: RDF },
  RDFS: { url: rdfsUrl, namespace: RDFS },
  OWL: { url: owlUrl, namespace: OWL },
  PROV: { url: provUrl, namespace: PROV },
  QUDT: { url: qudtUrl, namespace: QUDT },
  TIME: { url: timeUrl, namespace: TIME },
  SKOS: { url: skosUrl, namespace: SKOS },
  SOSA: { url: sosaUrl, namespace: SOSA },
  ECFO: { url: ecfoUrl, namespace: ECFO },
  PECO: { url: pecoUrl, namespace: PECO }
};

module.exports = ontologies;
