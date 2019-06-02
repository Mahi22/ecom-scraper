const test = require('ava');
const dirtree = require('../lib/directoryTree');
const testTree  = require('./fixture.js');
const excludeTree = require('./excludeDir.js');
	test('should return an Object', t => {
    const tree = dirtree('./test/test_data',{extensions:/\.txt$/});
    t.truthy(typeof tree === 'object');
    console.log(tree);
  });

  test('should list the children in a directory', t => {
    const tree = dirtree('./test/test_data', {extensions:/\.txt$/});
        t.is(tree.children.length, 4);
    // 4 including the empty `some_dir_2`.
  });

  test('should execute a callback function for each file with no specified extensions', t => {
    let number_of_files =  6;
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

    t.is(callback_executed_times, number_of_directories);
    console.log(callback_executed_times);
  });

  test('should execute a callback function for each file with specified extensions', t => {
    let number_of_files =  6;
    let callback_executed_times = 0;

    const tree = dirtree('./test/test_data', {extensions:/\.txt$/}, function(item, PATH) {
      callback_executed_times++;
    });
    t.is(callback_executed_times,number_of_files);
    console.log(callback_executed_times);
  });

  test('should display the size of a directory (summing up the children)', t => {
    const tree = dirtree('./test/test_data', {extensions:/\.txt$/});
    t.falsy(tree.size>11000);
    console.log(tree.length);
  });

  test('should not crash with directories where the user does not have necessary permissions', t => {
    const tree = dirtree('/root/', {extensions:/\.txt$/});
    t.is(tree,null);
    console.log(tree);
  });

  test('should return the correct exact result', t => {
		const tree = dirtree('./test/test_data', {normalizePath: true});
        t.is(tree,testTree);
        console.log('*****');
        console.log(testTree);
        console.log(tree);
  }); //not getting

  test('should exclude the correct folders', t => {
      const tree = dirtree('./test/test_data',{exclude: /some_dir_2/, normalizePath: true});
      t.deepEqual(tree,excludeTree);
      console.log(tree);
  });