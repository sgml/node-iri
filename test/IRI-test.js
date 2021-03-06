var vows=require('vows');
var assert=require('assert');
var iri=require('../');
var IRI=iri.IRI;

function testConversion(irival, urival){
	return {
		'IRI->URI': function(){ assert.strictEqual(new IRI(irival).toURIString(), urival); },
		'URI->IRI': function(){ assert.strictEqual(new IRI(urival).toIRIString(), irival); }
	};
}

vows.describe('rdf.IRI').addBatch( // The builtin RDFEnvironment
{ "(new IRI(<http://example.com/>))":
	{ topic: new IRI('http://example.com/')
	, ".nodeType() === 'IRI'": function(t){ assert.strictEqual(t.scheme(), 'http'); }
	, ".toNT()": function(t){ assert.strictEqual(t.toNT(), '<http://example.com/>'); }
	, ".n3()": function(t){ assert.strictEqual(t.n3(), '<http://example.com/>'); }
	, ".defrag() is self": function(t){ assert.strictEqual(t.defrag().value, 'http://example.com/'); }
	, ".isAbsolute() is true": function(t){ assert.strictEqual(t.isAbsolute(), true); }
	, ".toAbsolute() is self": function(t){ assert.strictEqual(t.toAbsolute().value, 'http://example.com/'); }
	, ".authority() === 'example.com'": function(t){ assert.strictEqual(t.authority(), 'example.com'); }
	, ".fragment() is null": function(t){ assert.isNull(t.fragment()); }
	, ".hierpart() === '//example.com/'": function(t){ assert.strictEqual(t.hierpart(), '//example.com/'); }
	, ".host() === 'example.com'": function(t){ assert.strictEqual(t.host(), 'example.com'); }
	, ".path() === '/'": function(t){ assert.strictEqual(t.path(), '/'); }
	, ".port() is null": function(t){ assert.isNull(t.port()); }
	, ".query() is null": function(t){ assert.isNull(t.query()); }
	, ".resolveReference(absoluteURI)": function(t){ assert.strictEqual(t.resolveReference('http://xyz.example.org/123').value, 'http://xyz.example.org/123'); }
	, ".resolveReference(path)": function(t){ assert.strictEqual(t.resolveReference('/a/b/c').value, 'http://example.com/a/b/c'); }
	, ".resolveReference(authority)": function(t){ assert.strictEqual(t.resolveReference('//example.org/1?x').value, 'http://example.org/1?x'); }
	, ".resolveReference(relative)": function(t){ assert.strictEqual(t.resolveReference('b/c.js').value, 'http://example.com/b/c.js'); }
	, ".resolveReference(decend)": function(t){ assert.strictEqual(t.resolveReference('../..').value, 'http://example.com/'); }
	, ".resolveReference(query)": function(t){ assert.strictEqual(t.resolveReference('?query').value, 'http://example.com/?query'); }
	, ".scheme() === 'http'": function(t){ assert.strictEqual(t.scheme(), 'http'); }
	, ".userinfo() is null": function(t){ assert.isNull(t.userinfo()); }
	}
, "(new iri.IRI(<https://user:pass@a.example.com:8080/b/c/d/?123&aa=1&aa=2#455>))":
	{ topic: new iri.IRI('https://user:pass@a.example.com:8080/b/c/d/?123&aa=1&aa=2#455')
	, ".nodeType() === 'IRI'": function(t){ assert.strictEqual(t.nodeType(), 'IRI'); }
	, ".toNT()": function(t){ assert.strictEqual(t.toNT(), '<https://user:pass@a.example.com:8080/b/c/d/?123&aa=1&aa=2#455>'); }
	, ".n3()": function(t){ assert.strictEqual(t.n3(), '<https://user:pass@a.example.com:8080/b/c/d/?123&aa=1&aa=2#455>'); }
	, ".defrag() strips fragment": function(t){ assert.strictEqual(t.defrag().value, 'https://user:pass@a.example.com:8080/b/c/d/?123&aa=1&aa=2'); }
	, ".isAbsolute() is false": function(t){ assert.strictEqual(t.isAbsolute(), false); }
	, ".toAbsolute() strips fragment": function(t){ assert.strictEqual(t.toAbsolute().value, 'https://user:pass@a.example.com:8080/b/c/d/?123&aa=1&aa=2'); }
	, ".authority() === 'user:pass@a.example.com:8080'": function(t){ assert.strictEqual(t.authority(), 'user:pass@a.example.com:8080'); }
	, ".fragment()": function(t){ assert.strictEqual(t.fragment(), '#455'); }
	, ".hierpart()": function(t){ assert.strictEqual(t.hierpart(), '//user:pass@a.example.com:8080/b/c/d/'); }
	, ".host() === 'a.example.com'": function(t){ assert.strictEqual(t.host(), 'a.example.com'); }
	, ".path() === '/b/c/d/?123&aa=1&aa=2'": function(t){ assert.strictEqual(t.path(), '/b/c/d/'); }
	, ".port() is '8080'": function(t){ assert.strictEqual(t.port(), '8080'); }
	, ".query()": function(t){ assert.strictEqual(t.query(), '?123&aa=1&aa=2'); }
	, ".resolveReference(absoluteURI)": function(t){ assert.strictEqual(t.resolveReference('http://xyz.example.org/123').value, 'http://xyz.example.org/123'); }
	, ".resolveReference(path)": function(t){ assert.strictEqual(t.resolveReference('/a/b/c').value, 'https://user:pass@a.example.com:8080/a/b/c'); }
	, ".resolveReference(authority)": function(t){ assert.strictEqual(t.resolveReference('//example.org/1?x').value, 'https://example.org/1?x'); }
	, ".resolveReference(relative)": function(t){ assert.strictEqual(t.resolveReference('b/c.js').value, 'https://user:pass@a.example.com:8080/b/c/d/b/c.js'); }
	, ".resolveReference(cwd)": function(t){ assert.strictEqual(t.resolveReference('.').value, 'https://user:pass@a.example.com:8080/b/c/d/'); }
	, ".resolveReference(decend)": function(t){ assert.strictEqual(t.resolveReference('../..').value, 'https://user:pass@a.example.com:8080/b/'); }
	, ".resolveReference(query)": function(t){ assert.strictEqual(t.resolveReference('?query').value, 'https://user:pass@a.example.com:8080/b/c/d/?query'); }
	, ".scheme() === 'https'": function(t){ assert.strictEqual(t.scheme(), 'https'); }
	, ".userinfo()": function(t){ assert.strictEqual(t.userinfo(), 'user:pass'); }
	}
, "(new iri.IRI(<http://a/b/c/d;p?q>))":
	// The examples from RFC 3986
	{ topic: new iri.IRI('http://a/b/c/d;p?q')
	, ".resolveReference(<g:h>)": function(t){ assert.strictEqual(t.resolveReference("g:h").value, "g:h"); }
	, ".resolveReference(<g>)": function(t){ assert.strictEqual(t.resolveReference("g").value, "http://a/b/c/g"); }
	, ".resolveReference(<./g>)": function(t){ assert.strictEqual(t.resolveReference("./g").value, "http://a/b/c/g"); }
	, ".resolveReference(<g/>)": function(t){ assert.strictEqual(t.resolveReference("g/").value, "http://a/b/c/g/"); }
	, ".resolveReference(</g>)": function(t){ assert.strictEqual(t.resolveReference("/g").value, "http://a/g"); }
	, ".resolveReference(<//g>)": function(t){ assert.strictEqual(t.resolveReference("//g").value, "http://g"); }
	, ".resolveReference(<?y>)": function(t){ assert.strictEqual(t.resolveReference("?y").value, "http://a/b/c/d;p?y"); }
	, ".resolveReference(<g?y>)": function(t){ assert.strictEqual(t.resolveReference("g?y").value, "http://a/b/c/g?y"); }
	, ".resolveReference(<#s>)": function(t){ assert.strictEqual(t.resolveReference("#s").value, "http://a/b/c/d;p?q#s"); }
	, ".resolveReference(<g#s>)": function(t){ assert.strictEqual(t.resolveReference("g#s").value, "http://a/b/c/g#s"); }
	, ".resolveReference(<g?y#s>)": function(t){ assert.strictEqual(t.resolveReference("g?y#s").value, "http://a/b/c/g?y#s"); }
	, ".resolveReference(<;x>)": function(t){ assert.strictEqual(t.resolveReference(";x").value, "http://a/b/c/;x"); }
	, ".resolveReference(<g;x>)": function(t){ assert.strictEqual(t.resolveReference("g;x").value, "http://a/b/c/g;x"); }
	, ".resolveReference(<g;x?y#s>)": function(t){ assert.strictEqual(t.resolveReference("g;x?y#s").value, "http://a/b/c/g;x?y#s"); }
	, ".resolveReference(<>)": function(t){ assert.strictEqual(t.resolveReference("").value, "http://a/b/c/d;p?q"); }
	, ".resolveReference(<.>)": function(t){ assert.strictEqual(t.resolveReference(".").value, "http://a/b/c/"); }
	, ".resolveReference(<./>)": function(t){ assert.strictEqual(t.resolveReference("./").value, "http://a/b/c/"); }
	, ".resolveReference(<..>)": function(t){ assert.strictEqual(t.resolveReference("..").value, "http://a/b/"); }
	, ".resolveReference(<../>)": function(t){ assert.strictEqual(t.resolveReference("../").value, "http://a/b/"); }
	, ".resolveReference(<../g>)": function(t){ assert.strictEqual(t.resolveReference("../g").value, "http://a/b/g"); }
	, ".resolveReference(<../..>)": function(t){ assert.strictEqual(t.resolveReference("../..").value, "http://a/"); }
	, ".resolveReference(<../../>)": function(t){ assert.strictEqual(t.resolveReference("../../").value, "http://a/"); }
	, ".resolveReference(<../../g>)": function(t){ assert.strictEqual(t.resolveReference("../../g").value, "http://a/g"); }
	, ".resolveReference(<../../../g>)": function(t){ assert.strictEqual(t.resolveReference("../../../g").value, "http://a/g"); }
	, ".resolveReference(<../../../../g>)": function(t){ assert.strictEqual(t.resolveReference("../../../../g").value, "http://a/g"); }
	, ".resolveReference(</./g>)": function(t){ assert.strictEqual(t.resolveReference("/./g").value, "http://a/g"); }
	, ".resolveReference(</../g>)": function(t){ assert.strictEqual(t.resolveReference("/../g").value, "http://a/g"); }
	, ".resolveReference(<g.>)": function(t){ assert.strictEqual(t.resolveReference("g.").value, "http://a/b/c/g."); }
	, ".resolveReference(<.g>)": function(t){ assert.strictEqual(t.resolveReference(".g").value, "http://a/b/c/.g"); }
	, ".resolveReference(<g..>)": function(t){ assert.strictEqual(t.resolveReference("g..").value, "http://a/b/c/g.."); }
	, ".resolveReference(<..g>)": function(t){ assert.strictEqual(t.resolveReference("..g").value, "http://a/b/c/..g"); }
	, ".resolveReference(<./../g>)": function(t){ assert.strictEqual(t.resolveReference("./../g").value, "http://a/b/g"); }
	, ".resolveReference(<./g/.>)": function(t){ assert.strictEqual(t.resolveReference("./g/.").value, "http://a/b/c/g/"); }
	, ".resolveReference(<g/./h>)": function(t){ assert.strictEqual(t.resolveReference("g/./h").value, "http://a/b/c/g/h"); }
	, ".resolveReference(<g/../h>)": function(t){ assert.strictEqual(t.resolveReference("g/../h").value, "http://a/b/c/h"); }
	, ".resolveReference(<g;x=1/./y>)": function(t){ assert.strictEqual(t.resolveReference("g;x=1/./y").value, "http://a/b/c/g;x=1/y"); }
	, ".resolveReference(<g;x=1/../y>)": function(t){ assert.strictEqual(t.resolveReference("g;x=1/../y").value, "http://a/b/c/y"); }
	, ".resolveReference(<g?y/./x>)": function(t){ assert.strictEqual(t.resolveReference("g?y/./x").value, "http://a/b/c/g?y/./x"); }
	, ".resolveReference(<g?y/../x>)": function(t){ assert.strictEqual(t.resolveReference("g?y/../x").value, "http://a/b/c/g?y/../x"); }
	, ".resolveReference(<g#s/./x>)": function(t){ assert.strictEqual(t.resolveReference("g#s/./x").value, "http://a/b/c/g#s/./x"); }
	, ".resolveReference(<g#s/../x>)": function(t){ assert.strictEqual(t.resolveReference("g#s/../x").value, "http://a/b/c/g#s/../x"); }
	}
, "IRI to URI conversion":
	{ topic: new IRI('http://www.example.org/red%09ros\xE9#red')
	, ".toURIString()": function(t){ assert.strictEqual(t.toURIString(), "http://www.example.org/red%09ros%C3%A9#red"); }
	}
, "IRI to URI conversion with surrogate pairs":
	{ topic: new IRI('http://example.com/\uD800\uDF00\uD800\uDF01\uD800\uDF02')
	, ".toURIString()": function(t){ assert.strictEqual(t.toURIString(), "http://example.com/%F0%90%8C%80%F0%90%8C%81%F0%90%8C%82"); }
	}
, "IRI<->URI conversion":
	{ "0": testConversion('http://www.example.org/red%09ros\xE9#red', 'http://www.example.org/red%09ros%C3%A9#red')
	, "1": testConversion('http://example.com/\uD800\uDF00\uD800\uDF01\uD800\uDF02', 'http://example.com/%F0%90%8C%80%F0%90%8C%81%F0%90%8C%82')
	, "2": testConversion('http://www.example.org/r\xE9sum\xE9.html', 'http://www.example.org/r%C3%A9sum%C3%A9.html')
	, "3": testConversion('http://www.example.org/%2F', 'http://www.example.org/%2F')
	}
}).export(module);
