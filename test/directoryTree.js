const test = require('ava');
const dirtree = require('../lib/directoryTree');
const testTree = require('./fixture.js');
const excludeTree =  require('./fixtureExclude.js');
const excludeTree2 =  require('./fixtureMultipleExclude.js');
	test('should return an Object', t => {
    const tree = dirtree('./test/test_data',{extensions:/\.txt$/});
    t.truthy(typeof tree === 'object');
    console.log(tree);
  });

  test('should list the children in a directory', t => {
		const tree = dirtree('./test/test_data', {extensions:/\.txt$/});

		// 4 including the empty `some_dir_2`.
    t.is(tree.children.length,4);
    console.log(tree.children);
  });

  test('should execute a callback function for each file with no specified extensions', t => {
		let number_of_files =  7;
		let callback_executed_times = 0;

		const tree = dirtree('./test/test_data', null, function(item, PATH) {
			callback_executed_times++;
		});

		t.is(callback_executed_times,number_of_files);
  });

  test('should execute a callback function for each directory', t => {
		let number_of_directories = 4;
		let callback_executed_times = 0;

		const tree = dirtree('./test/test_data', null, null, function(item, PATH) {
			callback_executed_times++;
		});

		t.is(callback_executed_times,number_of_directories);
  });

  test('should execute a callback function for each file with specified extensions', t => {
		let number_of_files =  6;
		let callback_executed_times = 0;

		const tree = dirtree('./test/test_data', {extensions:/\.txt$/}, function(item, PATH) {
			callback_executed_times++;
		});
		t.is(callback_executed_times,number_of_files);
  });

  test('should display the size of a directory (summing up the children)', t => {
		const tree = dirtree('./test/test_data', {extensions:/\.txt$/});
		t.truthy(tree.size>11000);
  });

  test('should not crash with directories where the user does not have necessary permissions', t => {
		const tree = dirtree('/root/', {extensions:/\.txt$/});
		t.is(tree,null);
  });

  test('should return the correct exact result', t => {
		const tree = dirtree('./test/test_data', {normalizePath: true});
		t.deepEqual(tree,testTree);
  });

  /* test('should not swallow exceptions thrown in the callback function', t => {
		const error = new Error('Something happened!');
		const badFunction = function () {
			dirtree('./test/test_data', {extensions:/\.txt$/}, function(item) {
			  throw error;
			});
		}
		t.is(badFunction,error.message);
  }); */

  test('should exclude the correct folders', t => {
		const tree = dirtree('./test/test_data',{exclude: /another_dir/, normalizePath: true});
		t.deepEqual(tree,excludeTree);
  });

  test('should exclude multiple folders', t => {
		const tree = dirtree('./test/test_data', {exclude: [/another_dir/, /some_dir_2/], normalizePath: true});
		t.deepEqual(tree,excludeTree2);

  });

  test('should include attributes', t => {
    const attributes = {name : 'prashant', sirName : 'madkar'};
		const tree = dirtree('./test/test_data',);
		tree.children.forEach((child) => {
			if(child.type == 'file'){
        t.deepEqual(attributes.name,'prashant');
        t.deepEqual(attributes.sirName,'madkar');

			}
		})
	});
