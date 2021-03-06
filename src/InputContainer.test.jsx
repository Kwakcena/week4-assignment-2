import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { render, fireEvent } from '@testing-library/react';

import InputContainer from './InputContainer';

import {
  updateRestaurant, addRestaurant,
} from './actions';

jest.mock('react-redux');

describe('InputContainer', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    name: '',
  }));

  function renderInputContainer() {
    const { getByText, getByPlaceholderText } = render((
      <InputContainer />
    ));
    return {
      inputTitle: getByPlaceholderText(/이름/),
      inputKind: getByPlaceholderText(/분류/),
      inputAddress: getByPlaceholderText(/주소/),
      addButton: getByText(/등록/),
    };
  }

  function getTarget(name, value) {
    return {
      name, value,
    };
  }

  describe('updateRestaurant', () => {
    context('이름을 입력하면', () => {
      it('이름이 바뀌어 반환된다.', () => {
        const { inputTitle } = renderInputContainer();
        fireEvent.change(inputTitle, {
          target: {
            value: '마녀들의 주방',
          },
        });
        const target = getTarget('name', '마녀들의 주방');
        expect(dispatch).toBeCalledWith(updateRestaurant(target));
      });
    });

    context('분류를 입력하면', () => {
      it('분류가 바뀌어 반환된다.', () => {
        const { inputKind } = renderInputContainer();
        fireEvent.change(inputKind, {
          target: {
            value: '한식',
          },
        });
        const target = getTarget('category', '한식');
        expect(dispatch).toBeCalledWith(updateRestaurant(target));
      });
    });

    context('주소를 입력하면', () => {
      it('주소가 바뀌어 반환된다.', () => {
        const { inputAddress } = renderInputContainer();
        fireEvent.change(inputAddress, {
          target: {
            value: '서울시 강남구',
          },
        });
        const target = getTarget('address', '서울시 강남구');
        expect(dispatch).toBeCalledWith(updateRestaurant(target));
      });
    });
  });

  describe('addRestaurant', () => {
    context('레스토랑을 등록하면', () => {
      it('목록에 등록된다.', () => {
        useSelector.mockImplementation((selector) => selector({
          name: '시카고 피자',
          category: '양식',
          address: '인천 학익동',
          restaurants: [],
        }));

        const { addButton } = renderInputContainer();
        expect(addButton).not.toBeNull();

        fireEvent.click(addButton);
        expect(dispatch).toBeCalledWith(addRestaurant());
      });
    });
  });
});
