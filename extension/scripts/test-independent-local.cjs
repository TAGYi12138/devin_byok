const assert=require('node:assert/strict');
const {createRuntime}=require('../server/image-runtime.cjs');
async function main(){let network=0;const fetchImpl=()=>{network++;throw Error('Local must not use business asset host');};const codec=createRuntime({fetchImpl});assert(codec.get(),'local source bundles sharp');assert.equal(await codec.ensure(),codec.get());
const missing=createRuntime({fetchImpl,load:()=>{throw Error('missing')},cacheRoot:require('node:os').tmpdir()});assert.equal(await missing.ensure(),null);assert.equal(network,0);assert.equal(require('../update-product.json').enabled,false);assert.equal(require('../update-product.json').baseUrl,'');assert.equal(require('../image-runtime.json').downloadEnabled,false);assert.equal(require('../cloud-product.json').enabled,false);console.log('INDEPENDENT_LOCAL_OK bundled-image-codec=ready asset-network=zero update-origin=empty cloud-mode=off');}
main().catch(e=>{console.error(e);process.exitCode=1;});
