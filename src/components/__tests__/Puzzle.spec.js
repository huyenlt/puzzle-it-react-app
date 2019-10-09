import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { Puzzle } from '../Puzzle';

describe('Row component', () => {
    let container, puzzleName;

    beforeEach(() => {
        puzzleName = 'numbers';
        container = render(<Puzzle picture={puzzleName}/>).container;
    });

    afterEach(() => {
        cleanup();
    });

    it('should render all nine images', () => {
        const imgList = container.querySelectorAll('img');

        expect(imgList).toHaveLength(9);

        imgList.forEach((img, index) => {
            expect(img.src).toEqual('https://photo-puzzle-picture.s3.amazonaws.com/' + puzzleName + '/' + (index + 1) + '.png');
        });
    });

    describe('when picture is changed to butterfly', () => {
        let newPuzzleName;

        beforeEach(() => {
            newPuzzleName = 'butterfly';

            fireEvent.change(container.querySelector('select'), { target: { value: newPuzzleName } });
        });

        it('should render with new picture name', () => {
            const imgList = container.querySelectorAll('img');

            expect(container.querySelector('select').value).toEqual(newPuzzleName);
            expect(imgList).toHaveLength(9);
            imgList.forEach((img, index) => {
                expect(img.src).toEqual('https://photo-puzzle-picture.s3.amazonaws.com/' + newPuzzleName + '/' + (index + 1) + '.png');
            });
        });
    });

    describe('when first image is clicked', () => {
        beforeEach(() => {
            const imgList = container.querySelectorAll('img');

            fireEvent.click(imgList[0]);
        });

        it('should not do anything to img list', () => {
            const imgList = container.querySelectorAll('img');

            imgList.forEach((img, index) => {
                expect(img.src).toEqual('https://photo-puzzle-picture.s3.amazonaws.com/' + puzzleName + '/' + (index + 1) + '.png');
            });
        });

        describe('when second image is clicked', () => {
            beforeEach(() => {
                const imgList = container.querySelectorAll('img');

                fireEvent.click(imgList[1]);
            });

            it('should swap two images when each are clicked', () => {
                const imgList = container.querySelectorAll('img');

                expect(imgList[0].src).toEqual('https://photo-puzzle-picture.s3.amazonaws.com/' + puzzleName + '/' + 2 + '.png');
                expect(imgList[1].src).toEqual('https://photo-puzzle-picture.s3.amazonaws.com/' + puzzleName + '/' + 1 + '.png');

                for (let i = 2; i < 9; i++) {
                    expect(imgList[i].src).toEqual('https://photo-puzzle-picture.s3.amazonaws.com/' + puzzleName + '/' + (i + 1) + '.png');
                }
            });
        });
    });
});