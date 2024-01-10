package aji.app.service;

import aji.app.entity.Product;
import aji.app.exception.ProductNotFoundException;
import aji.app.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public Product update(UUID id, Product product) {
        Optional<Product> productFromRepository = productRepository.findById(id);

        if (productFromRepository.isEmpty()) {
            throw new ProductNotFoundException("Task not found");
        }

        return productRepository.save(product);
    }

    public void delete(UUID id) {
        productRepository.deleteById(id);
    }

    public List<Product> get() {
        return productRepository.findAll();
    }
}
