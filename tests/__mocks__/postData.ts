export const posts = [
  {
    sys: {
      space: [Object],
      id: '2RdHyrfvufiXW8a0YMU57M',
      type: 'Entry',
      createdAt: '2020-02-25T07:20:54.812Z',
      updatedAt: '2020-04-18T07:43:59.913Z',
      environment: [Object],
      revision: 5,
      contentType: [Object],
      locale: 'en-US',
    },
    fields: {
      title: 'テストです',
      description: 'テストです説明',
      body:
        "# テストです\n## テストです\n引用符\n> - list1\n- list2\n  - nested 2-1\n  - nested 2-2\n    - nested 2-2-1\n    - nested 2-2-2\n- list3\n\n1. numberlist1\n2. numberlist2\n  1. nested number 2-1\n  2. nested number 2-2\n    1. nested number 2-2-1\n    2. nestednumber 2-2-2\n3. numberlist3\n\n[リンクテキスト][1]\n\n~~打消し戦~~\n\n`code`\n\n```ruby:hoge.rb\nimport 'foo'\n\nputs 'hoge'\n\ndef Fuga\n  foobar()\nend\n```\n\n\n---\n\n| Header     | Header     |\n| ---------- | ---------- |\n| Cell       | Cell       |\n| Cell       | Cell       |\n\n\n[1]: https://sa2taka.com \"りんく\"",
      author: {
        sys: {
          space: { sys: [Object] },
          id: '3yWjce9vaXRHE0WBNbAK8K',
          type: 'Entry',
          createdAt: '2020-02-25T07:16:20.223Z',
          updatedAt: '2020-02-25T07:16:20.223Z',
          environment: { sys: [Object] },
          revision: 1,
          contentType: { sys: [Object] },
          locale: 'en-US',
        },
        fields: {
          name: 'とっぷら',
          icon: {
            sys: {
              space: {
                sys: [Object],
              },
              id: 'yqkFj68vSFwN4ZUoZYZRY',
              type: 'Asset',
              createdAt: '2020-02-25T07:16:10.548Z',
              updatedAt: '2020-02-25T07:16:10.548Z',
              environment: {
                sys: [Object],
              },
              revision: 1,
              locale: 'en-US',
            },
            fields: {
              title: 'とっぷらアカウント',
              file: {
                url:
                  '//images.ctfassets.net/xw0ljpdch9v4/yqkFj68vSFwN4ZUoZYZRY/5f434a3cb885d70324c17fe65e56d310/b762fe018ee65ae2.jpeg',
                details: [Object],
                fileName: 'b762fe018ee65ae2.jpeg',
                contentType: 'image/jpeg',
              },
            },
          },
          at: 'https://mstdn-workers.com/@t0p_l1ght',
        },
      },
      category: {
        sys: {
          space: { sys: [Object] },
          id: '2sT7DHlU8ZpKkDwSX21jSI',
          type: 'Entry',
          createdAt: '2020-02-25T07:17:26.143Z',
          updatedAt: '2020-03-10T03:39:53.892Z',
          environment: { sys: [Object] },
          revision: 2,
          contentType: { sys: [Object] },
          locale: 'en-US',
        },
        fields: { name: 'そのほか', slug: 'other', sort: 999 },
      },
      slug: 'test',
      tags: ['tag1', 'tag2'],
      postImage: {
        sys: {
          space: { sys: [Object] },
          id: '1UXKnp1VWlhaYKv9P9Ix1m',
          type: 'Asset',
          createdAt: '2020-04-17T15:27:43.546Z',
          updatedAt: '2020-04-18T09:44:34.568Z',
          environment: { sys: [Object] },
          revision: 2,
          locale: 'en-US',
        },
        fields: {
          title: 'Test',
          file: {
            url:
              '//images.ctfassets.net/xw0ljpdch9v4/1UXKnp1VWlhaYKv9P9Ix1m/03e8b3371940c3d5236702d64d9eaf4d/091-free-backgrounds.png',
            details: [Object],
            fileName: '091-free-backgrounds.png',
            contentType: 'image/png',
          },
        },
      },
      public: true,
      releaseDate: '2020-03-11T00:00+09:00',
    },
  },
];
