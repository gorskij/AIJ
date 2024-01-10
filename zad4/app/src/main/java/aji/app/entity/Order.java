package aji.app.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "Name is mandatory")
    private String name;

    @Column(name = "status", nullable = false)
    @ManyToOne
    @JoinColumn(name = "status_id", nullable = false)
    @NotNull(message = "Status is mandatory")
    private OrderStatus orderStatus;

    @Column(name = "approval_date")
    private LocalDate approvalDate;

    @Column(name = "username", nullable = false)
    @NotBlank(message = "Username is mandatory")
    private String username;

    @Column(name = "email", nullable = false)
    @NotBlank(message = "Email is mandatory")
    private String email;

    @Column(name = "phone_number", nullable = false)
    @NotBlank(message = "Phone number is mandatory")
    private String phoneNumber;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems;
}
