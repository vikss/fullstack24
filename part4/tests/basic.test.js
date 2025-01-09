const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe("Test suite for verifying number of likes", () => {

    test("Dummy like", () => {
        const blogs=[]
        assert.strictEqual(1, listHelper.dummy(blogs))
    })

    test("total likes", () => {
        const bloglist = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 5,
                __v: 0
            }, {

                _id: '5a422aa71b54a676234d17rt',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                likes: 50,
                __v: 0

            },
            {
                _id: '5a422aa71b54a676234d17er',
                title: 'Vegetarian Dining in Thailand',
                author: 'Michelin',
                url: 'https://guide.michelin.com/en/article/features/vegetarian-dining-in-thailand',
                likes: 15,
                __v: 0

            }

        ]
        assert.strictEqual(listHelper.totalLikes(bloglist),70)
    })



})