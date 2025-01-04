# **Görüş Açısı Deneyimi ile Bilet Satın Alma Platformu**

Bu proje, kullanıcıların sinema, tiyatro, konser, futbol, basketbol ve benzeri organizasyonlar için satın aldıkları biletlerde, gerçekçi bir 3D deneyim ile oturacakları koltuğun veya yerin görüş açısını önceden görmelerini sağlamayı amaçlamaktadır.

---

## **Projenin Amacı**

Geleneksel bilet satın alma deneyiminden farklı olarak, bu platform:
- **Kullanıcı deneyimini artırmayı**,  
- Satın alınan yerin **gerçekçi bir şekilde önizlenmesini sağlamayı**,  
- **Memnuniyet düzeyini artırmayı** ve  
- Yanlış bilet alımından kaynaklı olumsuz deneyimleri azaltmayı hedeflemektedir.

---

## **Özellikler**

- **3D Görselleştirme:**  
  Kullanıcılar, satın alacakları koltuğun sahne, alan veya etkinlik merkezine olan gerçekçi görüş açısını 3D modellemeler aracılığıyla inceleyebilir.

- **Etkileşimli Arayüz:**  
  Kullanıcı, seçtiği yeri yakınlaştırabilir, uzaklaştırabilir ve farklı açılardan görüntüleyebilir.

- **Organizasyon Türleri:**  
  Sinema, tiyatro, konser, spor etkinlikleri (futbol, basketbol vb.) gibi farklı organizasyon türleri desteklenmektedir.

- **Kullanıcı Dostu Tasarım:**  
  Kolay ve anlaşılır bir kullanıcı arayüzü sunularak herkesin rahatlıkla kullanabilmesi sağlanır.

---

## **Teknolojiler**

Proje geliştirilirken aşağıdaki teknolojiler kullanılmıştır:

### **Frontend:**
- React  
- Three.js (3D modelleme ve görselleştirme)  

### **Backend:**
- .NET Core API  

### **Veritabanı:**
- PostgreSQL / MSSQL  

### **Diğer:**
- Docker (servis yönetimi)  
- Redis (hızlı veri erişimi)  
- Elasticsearch (arama ve filtreleme)  

---

## **Kullanım Senaryoları**

1. Kullanıcı, platform üzerinden bir etkinlik seçer.  
2. Etkinlik alanı ve oturma planı 3D olarak görüntülenir.  
3. Kullanıcı, uygun gördüğü yeri seçerek önizleme yapar.  
4. Görüş açısı deneyiminden memnun olan kullanıcı, bileti satın alır.  

---

## **Kurulum**

### **Gerekli Bağımlılıklar:**
- Node.js  
- .NET SDK  
- Docker  

### **Adımlar:**

1. Projeyi klonlayın:
   ```bash
   git clone <repository-url>
   
2. docker-compose up

# Frontend için:
cd frontend
npm install
npm start

# Backend için:
cd backend
dotnet run

## **Katkı**

Projeye katkıda bulunmak için aşağıdaki adımları izleyebilirsiniz:

1. Bu depoyu fork edin:
   ```bash
   git clone <repository-url>
2. git checkout -b feature/yeniozellik
3. git add .
4. git commit -m "Yeni özellik eklendi"
5. git push origin feature/yeniozellik