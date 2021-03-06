const tree =  { "path": "./test/test_data",
  "name": "test_data",
  "children" :
   [ { "path": "test/test_data/file_a.txt",
       "name": "file_a.txt",
       "size": 11,
       extension: ".txt",
       "type": "file" },
     { "path": "test/test_data/file_b.txt",
       "name": "file_b.txt",
       "size": 3766,
       "extension": ".txt",
       "type": "file" },
     { "path": "test/test_data/some_dir",
       "name": 'some_dir',
       children: [Array],
       size: 56,
       "type": 'directory' },
     { "path": 'test/test_data/some_dir_2',
       "name": 'some_dir_2',
       "children": [],
       size: 0,
       type: 'directory' } ],
       size : 3777,
       type : 'directory'
}

module.exports = tree;
