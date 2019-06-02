const tree =  {"path": "./test/test_data",
"name": "test_data",
"type": "directory",
"children": [
  {
    "path": "test/test_data/file_a.txt",
    "name": "file_a.txt",
    "size": 11,
    "type": "file",
    "extension": ".txt"
  },
  {
    "path": "test/test_data/file_b.txt",
    "name": "file_b.txt",
    "size": 3766,
    "type": "file",
    "extension": ".txt"
  },
  {
    "path": "test/test_data/some_dir",
    "name": "some_dir",
    "type": "directory",
    "children": [
      {
        "path": "test/test_data/some_dir/another_dir",
        "name": "another_dir",
        "type": "directory",
        "children": [
          {
            "path": "test/test_data/some_dir/another_dir/file_a.txt",
            "name": "file_a.txt",
            "size": 11,
            "type": "file",
            "extension": ".txt"
          },
          {
            "path": "test/test_data/some_dir/another_dir/file_b.txt",
            "name": "file_b.txt",
            "size": 3766,
            "type": "file",
            "extension": ".txt"
          }
        ],
        "size": 3777
      },
      {
        "path": "test/test_data/some_dir/file_a.txt",
        "name": "file_a.txt",
        "size": 20,
        "type": "file",
        "extension": ".txt"
      },
      {
        "path": "test/test_data/some_dir/file_b.txt",
        "name": "file_b.txt",
        "size": 11,
        "type": "file",
        "extension": ".txt"
      }
    ],
    "size": 3808
  },
  { "children" : [],
    "path": "test/test_data/some_dir_2",
    "name": "some_dir_2",
    "type": "directory",
    "size": 0
  }
],
"size": 7585
}

module.exports = tree;
