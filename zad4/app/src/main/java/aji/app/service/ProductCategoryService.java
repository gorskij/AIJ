package aji.app.service;

import aji.app.entity.ProductCategory;
import aji.app.repository.ProductCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductCategoryService {
    private final ProductCategoryRepository productCategoryRepository;

    public List<ProductCategory> get() {
        return productCategoryRepository.findAll();
    }
}
