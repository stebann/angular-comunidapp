# Especificaciones de Menús Dinámicos - Backend (ACTUALIZADO)

## Descripción General

El sistema de menús será dinámico basado en roles. Los menús se retornan en la respuesta del login y el frontend los renderiza automáticamente en el sidebar.

---

## 🎯 Clarificaciones Importantes

### ¿Para qué sirve el campo `activo`?

**Respuesta: Es opcional.** Solo sirve si quieres **desactivar menús desde BD** sin eliminarlos.

- Si siempre retornas todos los menús del rol = **Ignora este campo**
- Si quieres controlar dinámicamente qué menús mostrar = **Úsalo**

**Por ahora:** Simplemente ignóralo. Retorna solo los menús asignados al rol del usuario.

### Menús para cada rol

- **USUARIO:** 6 menús (todos los actuales)
- **ADMIN:** Solo 2 menús (Usuarios + Artículos)

---

## 📋 Rutas/Menús por Rol

### ROL: USUARIO

| #   | Nombre        | Ruta            | Icono              | Orden |
| --- | ------------- | --------------- | ------------------ | ----- |
| 1   | Inicio        | `inicio`        | `pi pi-home`       | 1     |
| 2   | Explorar      | `explorar`      | `pi pi-search`     | 2     |
| 3   | Mis Artículos | `mis-articulos` | `pi pi-box`        | 3     |
| 4   | Mis Gestiones | `mis-gestiones` | `pi pi-list`       | 4     |
| 5   | Estadísticas  | `estadisticas`  | `pi pi-chart-line` | 5     |
| 6   | Comercios     | `comercios`     | `pi pi-store`      | 6     |

### ROL: ADMIN

| #   | Nombre    | Ruta        | Icono         | Orden |
| --- | --------- | ----------- | ------------- | ----- |
| 1   | Usuarios  | `usuarios`  | `pi pi-users` | 1     |
| 2   | Artículos | `articulos` | `pi pi-boxes` | 2     |

---

## 🔄 Estructura de Respuesta (Login)

### Request (SIN CAMBIOS)

```json
POST /api/auth/ingresar
{
  "usuario": "juan_perez",
  "contrasena": "password123"
}
```

### Response 200 OK - USUARIO

Retorna el usuario actual + rol + menus:

```json
{
  "id": 1,
  "nombreCompleto": "Juan Pérez",
  "email": "juan@example.com",
  "telefono": "555-1234",
  "direccion": "Calle 123",
  "avatarUrl": "https://...",
  "ratingPromedio": 4.5,

  "rol": "usuario",
  "menus": [
    {
      "id": 1,
      "nombre": "Inicio",
      "ruta": "inicio",
      "icono": "pi pi-home",
      "orden": 1
    },
    {
      "id": 2,
      "nombre": "Explorar",
      "ruta": "explorar",
      "icono": "pi pi-search",
      "orden": 2
    },
    {
      "id": 3,
      "nombre": "Mis Artículos",
      "ruta": "mis-articulos",
      "icono": "pi pi-box",
      "orden": 3
    },
    {
      "id": 4,
      "nombre": "Mis Gestiones",
      "ruta": "mis-gestiones",
      "icono": "pi pi-list",
      "orden": 4
    },
    {
      "id": 5,
      "nombre": "Estadísticas",
      "ruta": "estadisticas",
      "icono": "pi pi-chart-line",
      "orden": 5
    },
    {
      "id": 6,
      "nombre": "Comercios",
      "ruta": "comercios",
      "icono": "pi pi-store",
      "orden": 6
    }
  ]
}
```

### Response 200 OK - ADMIN

```json
{
  "id": 2,
  "nombreCompleto": "Admin User",
  "email": "admin@example.com",
  "telefono": "555-5678",
  "direccion": "Oficina Central",
  "avatarUrl": "https://...",
  "ratingPromedio": 5.0,

  "rol": "admin",
  "menus": [
    {
      "id": 7,
      "nombre": "Usuarios",
      "ruta": "usuarios",
      "icono": "pi pi-users",
      "orden": 1
    },
    {
      "id": 8,
      "nombre": "Artículos",
      "ruta": "articulos",
      "icono": "pi pi-boxes",
      "orden": 2
    }
  ]
}
```

---

## 🗄️ Base de Datos

### Tabla: roles

```sql
CREATE TABLE roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (nombre, descripcion) VALUES
('usuario', 'Usuario estándar'),
('admin', 'Administrador');
```

### Tabla: menus

```sql
CREATE TABLE menus (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  ruta VARCHAR(100) NOT NULL UNIQUE,
  icono VARCHAR(100),
  orden INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO menus (nombre, ruta, icono, orden) VALUES
('Inicio', 'inicio', 'pi pi-home', 1),
('Explorar', 'explorar', 'pi pi-search', 2),
('Mis Artículos', 'mis-articulos', 'pi pi-box', 3),
('Mis Gestiones', 'mis-gestiones', 'pi pi-list', 4),
('Estadísticas', 'estadisticas', 'pi pi-chart-line', 5),
('Comercios', 'comercios', 'pi pi-store', 6),
('Usuarios', 'usuarios', 'pi pi-users', 1),
('Artículos', 'articulos', 'pi pi-boxes', 2);
```

### Tabla: rol_menus (Relación M-a-M)

```sql
CREATE TABLE rol_menus (
  id INT PRIMARY KEY AUTO_INCREMENT,
  rol_id INT NOT NULL,
  menu_id INT NOT NULL,
  FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_id) REFERENCES menus(id) ON DELETE CASCADE,
  UNIQUE KEY unique_rol_menu (rol_id, menu_id)
);

-- USUARIO (rol_id=1) obtiene menús 1-6
INSERT INTO rol_menus (rol_id, menu_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6);

-- ADMIN (rol_id=2) obtiene solo menús 7-8
INSERT INTO rol_menus (rol_id, menu_id) VALUES
(2, 7), (2, 8);
```

### Tabla: usuarios (Modificación)

```sql
ALTER TABLE usuarios ADD COLUMN rol_id INT NOT NULL DEFAULT 1;
ALTER TABLE usuarios ADD FOREIGN KEY (rol_id) REFERENCES roles(id);
```

---

## ☕ Código Java

### DTO: MenuDTO.java

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MenuDTO {
    private Long id;
    private String nombre;
    private String ruta;
    private String icono;
    private Integer orden;
}
```

### DTO: LoginResponseDTO.java

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
    private Long id;
    private String nombreCompleto;
    private String email;
    private String telefono;
    private String direccion;
    private String avatarUrl;
    private Float ratingPromedio;

    // NUEVOS CAMPOS
    private String rol;
    private List<MenuDTO> menus;
}
```

### Entity: Rol.java

```java
@Entity
@Table(name = "roles")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    private String descripcion;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt = LocalDateTime.now();
}
```

### Entity: Menu.java

```java
@Entity
@Table(name = "menus")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String ruta;

    private String icono;

    private Integer orden = 0;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt = LocalDateTime.now();
}
```

### Actualización: Usuario.java

```java
@Entity
@Table(name = "usuarios")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    // ... campos existentes ...

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "rol_id", nullable = false)
    private Rol rol;
}
```

### En AuthController.java

```java
@PostMapping("/ingresar")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    // 1. Validar credenciales
    Usuario usuario = usuarioService.findByNombreUsuario(request.getUsuario());
    if (usuario == null || !passwordEncoder.matches(request.getContrasena(), usuario.getContrasena())) {
        return ResponseEntity.status(401).body("Credenciales inválidas");
    }

    // 2. Obtener menus del rol
    List<Menu> menus = menuService.getMenusByRol(usuario.getRol().getId());

    // 3. Mapear a DTOs
    List<MenuDTO> menusDTO = menus.stream()
        .map(m -> new MenuDTO(m.getId(), m.getNombre(), m.getRuta(), m.getIcono(), m.getOrden()))
        .sorted((a, b) -> a.getOrden().compareTo(b.getOrden()))
        .collect(Collectors.toList());

    // 4. Construir response
    LoginResponseDTO response = new LoginResponseDTO(
        usuario.getId(),
        usuario.getNombreCompleto(),
        usuario.getEmail(),
        usuario.getTelefono(),
        usuario.getDireccion(),
        usuario.getAvatarUrl(),
        usuario.getRatingPromedio(),
        usuario.getRol().getNombre(),
        menusDTO
    );

    return ResponseEntity.ok(response);
}
```

---

## 📝 Checklist Backend

- [ ] Crear tabla `roles`
- [ ] Crear tabla `menus`
- [ ] Crear tabla `rol_menus`
- [ ] Agregar columna `rol_id` a `usuarios`
- [ ] Crear Entity `Rol`
- [ ] Crear Entity `Menu`
- [ ] Crear DTO `MenuDTO`
- [ ] Crear DTO `LoginResponseDTO`
- [ ] Actualizar Entity `Usuario` con relación a `Rol`
- [ ] Crear Service `MenuService` con método `getMenusByRol()`
- [ ] Actualizar `AuthController` endpoint `/ingresar`
- [ ] Insertar datos iniciales en BD
- [ ] Testear en Postman

---

## ✅ Una vez hecho en Backend

El frontend:

1. Guardará `rol` y `menus` en `AuthService`
2. Pasará `menus` al `LayoutComponent`
3. Renderizará dinámicamente en el sidebar
4. Cada usuario verá solo sus menús

**El resto del frontend ya está listo para recibir esto.**
