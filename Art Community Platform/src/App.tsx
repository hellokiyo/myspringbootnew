import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { MapPin, Calendar, User, Info, Upload, Heart, Share2 } from 'lucide-react';
import { ArtMap } from './components/ArtMap';
import { EventCalendar } from './components/EventCalendar';
import { ArtistProfiles } from './components/ArtistProfiles';
import { SupportInfo } from './components/SupportInfo';

export default function App() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">동네 예술 공간</h1>
                <p className="text-sm text-gray-600">우리 동네 예술을 기록하고 나누는 곳</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              작품 등록
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>예술 지도</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>행사 달력</span>
            </TabsTrigger>
            <TabsTrigger value="artists" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>예술가 공간</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2">
              <Info className="w-4 h-4" />
              <span>지원 정보</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-0">
            <ArtMap />
          </TabsContent>

          <TabsContent value="events" className="mt-0">
            <EventCalendar />
          </TabsContent>

          <TabsContent value="artists" className="mt-0">
            <ArtistProfiles />
          </TabsContent>

          <TabsContent value="support" className="mt-0">
            <SupportInfo />
          </TabsContent>
        </Tabs>
      </main>

      {/* Featured Section */}
      {activeTab === 'map' && (
        <section className="max-w-6xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">이번 주 인기 작품</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1758030306457-e54f25fe4384?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnQlMjBtdXJhbHxlbnwxfHx8fDE3NTg3NzQ3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="거리 벽화"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90">
                    <Heart className="w-3 h-3 mr-1 text-red-500" />
                    24
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">색채의 조화</h3>
                <p className="text-sm text-gray-600 mb-3">홍대 거리의 아름다운 벽화 작품</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    홍대입구역 2번 출구
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1713779490284-a81ff6a8ffae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NTg3NDI0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="갤러리 전시"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90">
                    <Heart className="w-3 h-3 mr-1 text-red-500" />
                    18
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">현대미술 조각상</h3>
                <p className="text-sm text-gray-600 mb-3">강남구 공원에 설치된 조각 작품</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    선정릉역 인근 공원
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1654870574819-ee447f65112d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjB3b3Jrc3BhY2UlMjBzdHVkaW98ZW58MXx8fHwxNzU4NzQzNjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="아티스트 작업실"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90">
                    <Heart className="w-3 h-3 mr-1 text-red-500" />
                    31
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">커뮤니티 아트</h3>
                <p className="text-sm text-gray-600 mb-3">지역 주민들이 함께 만든 벽화</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    마포구 합정동
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}